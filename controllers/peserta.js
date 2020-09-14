const db = require('../database/models/index.js');
const email_helper = require('../helpers/email');
const randomstring = require("randomstring");
const moment = require('moment');

const welcomeEmailTemplate = data => {
  return ``
}
module.exports = {
  list: (req, res) => {
    db.peserta.findAll().then( result => {
      res.json({
          status: 'OK',
          messages: '',
          data: result
      });
    }).catch(err => {
      res.status(500).json({
          status: 'ERROR',
          messages: err,
          data: {}
      });
    });
  },

  get: async (req, res) => {
    try {
      const account_peserta = await db.peserta.findByPk(req.params.id);
      if(account_peserta==null) {
        return res.status(404).json({
          status: 'ERROR',
          messages: 'Data not found.',
          data: {}
        });
      }
      const account = await db.peserta.getAccount(account_peserta.email, account_peserta.id);

      return res.json({
        status: 'OK',
        messages: '',
        data: account
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    }
  },

  getList: async (req, res) => {
    try {
      const event_test = await db.jadwalTest.findByPk(req.params.id);    
      if(event_test === null) {
        return res.status(404).json({
          message: 'Jadwal test not found!'
        });
      }

      const list_peserta = await db.sequelize.query("SELECT * FROM user JOIN peserta ON user.email=peserta.email WHERE peserta.jadwal_test=?", {
        replacements: [event_test.id],
        type: sequelize.QueryTypes.SELECT
      });
            
      const jumlah_peserta = await db.peserta.count({
        where: { jadwal_test: event_test.id }
      });
      
      res.json({
        status: 'OK',
        messages: '',
        data: {
          peserta: list_peserta,
          jumlah_peserta
        }
      });
    } catch(err) {
      res.status(500).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    }
  },

  create: async (req, res) => {
    try {
      let { user_email, jadwal_test } = req.body
      let calon_peseta = []

      let test = await db.jadwalTest.findByPk(jadwal_test);

      user_email.forEach(row => {
        calon_peseta.push({
          email: row,
          password: randomstring.generate(8),
          valid: test.waktu,
          expired: moment(test.expired).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
          jadwal_test: jadwal_test
        });
      });

      db.peserta.bulkCreate(calon_peseta);

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

  update: async (req, res) => {
    try {
      const query = await db.peserta.update({
        valid: req.body.valid,
        expired: req.body.expired
      }, { where: {id: req.params.id} });
      if(query==null) {
        return res.status(400).json({
          status: 'ERROR',
          messages: 'field update not match',
          data: {}
        });
      }

      return res.json({
        status: 'OK',
        messages: 'Success update data.',
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

  delete: (req, res) => {
    db.peserta.destroy({
      where: {
        id: req.params.id
      }
    }).then( result => {
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
  },

  welcomeEmail: async (req, res) => {
    try {
      const to = req.params.email;
      const id_jadwaltest = req.params.jadwaltest;

      const event = db.jadwalTest.findOne({id: id_jadwaltest});
      const peserta = db.peserta.findOne({email: to, jadwal_test: id_jadwaltest});

      if(!event || !peserta) {
        return res.status(404).json({
          messages: 'jadwal test atau email peserta tidak ditemukan!',
          data: {}
        })
      }

      const data = {
        tanggal: moment(event.waktu).format('DD-MM-YYYY [jam] HH:mm [WIB]'),
        nama: peserta.nama,
        password: peserta.password
      }

      const html = email_helper.welcomeTemplate(data);
      return res.send(html)
      const data_email = {
        from: "support-staging@educasia.id", // sender address
        to: to, // list of receivers
        subject: `Selamat datang peserta ${process.env.APP_NAME}`, // Subject line
        text: `Selamat anda telah ditambahkan dalam ujian tes minat bakat ${process.env.APP_NAME}.`, // plain text body
        html: html, // html body
      }

      email_helper.sendEmail(data_email).catch(console.error);

      res.json({
        status: 'OK',
        messages: 'Email terkirim.',
        data: {}
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    }
  }
}