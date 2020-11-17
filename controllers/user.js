const { user, peserta, jadwalTest } = require('../database/models');
const Excel = require('exceljs');
const randomstring = require("randomstring");
const moment = require('moment');

module.exports = {
  userPeserta: async (req, res) => {
    try {
      const test = await jadwalTest.findByPk(req.body.jadwal_test);

      if(test == null) {
        return res.status(404).json({
          status: 'ERROR',
          messages: 'jadwal test not found!',
          data: {}
        });
      }

      const account = await user.findOrCreate({
        where: {
          email: req.body.email
        },
        defaults: {
          nama: req.body.nama,
          email: req.body.email,
          no_hp: req.body.no_hp,
          tanggal_lahir: moment(req.body.tanggal_lahir).format('YYYY-MM-DD'),
          jenis_kelamin: req.body.jenis_kelamin,
          kelompok: req.body.kelompok,
          instansi: req.body.instansi
        }
      });

      if(account) {
        await peserta.create({
          email: req.body.email,
          password: randomstring.generate(8),
          valid: test.waktu,
          expired: moment(test.expired).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
          jadwal_test: test.id,
          jenis_test: req.body.jenis_test
        });
      }

      res.json({
        status: 'OK',
        messages: 'Success insert data.',
        data: {}
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    }
  },

  import: async (req, res) => {
    try {
      let { jadwal_test } = req.body;
      let jenisTest = [];
      let data_excel = [];
      let data_err = [];
      if (req.body.jenis_test && req.body.jenis_test.trim().split(',').length > 0) {
        jenisTest = req.body.jenis_test.trim().split(',');
        jenisTest = jenisTest.sort();
      } else {
        return res.status(404).json({
          status: 'ERROR',
          messages: 'Jenis test not found!',
          data: {}
        });
      }
      const test = await jadwalTest.findByPk(jadwal_test);
      if(jadwal_test && test==null) {
        return res.status(404).json({
          status: 'ERROR',
          messages: 'Jadwal test not found!',
          data: {}
        });
      }
      const workbook = new Excel.Workbook();
      await workbook.xlsx.readFile(req.file.path);
      const worksheet = workbook.worksheets[0];

      const expired = moment(test.expired).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
      worksheet.eachRow((row, rowNumber) => {
        if(rowNumber > 1) {
          const insertUser = {
            nama: row.values[2],
            email: row.values[3],
            no_hp: row.values[4],
            tanggal_lahir: row.values[5],
            jenis_kelamin: row.values[6],
            kelompok: row.values[7],
            instansi: row.values[8]
          }
          data_excel.push(insertUser);
        }
      });
      let row = 1;
      for(const item of data_excel) {
        let nama = item.nama ? item.nama.trim() : null;
        let email = item.email ? (item.email.text ? item.email.text.trim() : item.email.trim()) : null;
        let no_hp = item.no_hp ? item.no_hp.trim() : null;
        let tanggal_lahir = item.tanggal_lahir ? String(item.tanggal_lahir).trim() : null;
        tanggal_lahir = moment(tanggal_lahir).format('YYYY-MM-DD');
        let jenis_kelamin = item.jenis_kelamin ? item.jenis_kelamin.trim() : null;
        let kelompok = item.kelompok ? item.kelompok.trim() : null;
        let instansi = item.instansi ? item.instansi.trim() : null;
        
        const insertUser = await user.findOrCreate({
          defaults: {
            nama: nama,
            email: email,
            no_hp: no_hp,
            tanggal_lahir: tanggal_lahir,
            jenis_kelamin: jenis_kelamin,
            kelompok: kelompok,
            instansi: instansi,
          },
            where: {
              email: email
            }             
        }).catch(err => {
          return null
        });
        
        if(insertUser === null)
          data_err.push({
            no: row,
            email: email,
            no_hp: no_hp
          });
        else 
          peserta.findOrCreate({
            defaults: {
              email: email,
              password: randomstring.generate(8),
              valid: test.waktu,
              expired: expired,
              jadwal_test: jadwal_test,
              jenis_test: jenisTest,
            },
            where: {
              email: email,
              jadwal_test: jadwal_test
            }
          });
        row++;
      };
      
      if(data_err.length > 0) {
        return res.status(422).json({
          status: 'ERROR',
          messages: 'beberapa data gagal di input',
          data: data_err
        });  
      }

      return res.json({
        status: 'OK',
        messages: 'Success insert data.',
        data: {}
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    }
  },

  list: async (req, res) => {
    try {
      if(req.query.email) {
        const account_user = await user.findOne({
          where: {
            email: req.query.email
          }
        });

        if(account_user) {
          return res.json({
            status: 'OK',
            messages: '',
            data: account_user
          });
        }

        res.status(404).json({
          status: 'OK',
          messages: 'Data not found!',
          data: {}
        });
      } else {
        const account_user = await user.findAll();
        return res.json({
          status: 'OK',
          messages: '',
          data: account_user
        });
      }
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    }
  },

  get: (req, res) => {
    user.findOne({
      where: { id: req.params.id }
    }).then( users => {
      if( users === null ) {
        return res.status(404).json({
          status: 'ERROR',
          messages: 'Resource Not Found!',
          data: {}
        });
      }
      res.json({
        status: 'OK',
        messages: '',
        data: users
      });
    }).catch( err => {
      res.status(500).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    });
  },

  create: (req, res) => {
    let { nama, email, no_hp, tanggal_lahir, kelompok, instansi, jenis_kelamin } = req.body
    user.create({
      nama: nama,
      email: email,
      no_hp: no_hp,
      tanggal_lahir: tanggal_lahir,
      jenis_kelamin: jenis_kelamin,
      kelompok: kelompok,
      instansi: instansi
    }).then( users => {
      res.json({
        status: 'OK',
        messages: 'Success insert data.',
        data: users
      });
    }).catch( err => {
      res.status(400).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    });
  },

  update: (req, res) => {
    let { nama, email, no_hp, tanggal_lahir, kelompok, instansi, jenis_kelamin } = req.body
    user.update({
      nama: nama,
      email: email,
      no_hp: no_hp,
      tanggal_lahir: tanggal_lahir,
      jenis_kelamin: jenis_kelamin,
      kelompok: kelompok,
      instansi: instansi
    }, {
      where: {
        id: req.params.id
      }
    }).then( users => {
      res.json({
        status: 'OK',
        messages: 'Success update data.',
        data: {
          id: req.params.id,
          nama: nama,
          email: email,
          no_hp: no_hp,
          tanggal_lahir: tanggal_lahir,
          jenis_kelamin: jenis_kelamin,
          kelompok: kelompok,
          instansi: instansi
        }
      });
    }).catch( err => {
      res.status(400).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    });
  },

  delete: (req, res) => {
    user.destroy({
      where: {
        id: req.params.id
      }
    }).then( users => {
      res.json({
        status: 'OK',
        messages: 'Success delete data.',
        data: {}
      });
    }).catch( err => {
      res.status(500).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    });
  }
}