const db = require('../database/models/index.js');
const email_helper = require('../helpers/email');
const randomstring = require("randomstring");
const moment = require('moment');

module.exports = {
  show_jawaban: async (req, res) => {
    try {
      const peserta_id = req.params.pesertaId;
      const jenis_soal = req.query.test;

      const peserta = await db.peserta.findByPk(peserta_id);
      if(!peserta)
        return res.status(404).json({
          status: 'ERROR',
          message: 'Data not found!',
          data: {}
        });
      
      const jawaban = await db.jawaban.findAll({
        attributes: ['jawaban_peserta', 'paket_soal'],
        order: [['paket_soal', 'ASC']],
        where: {
          peserta_id: peserta_id,
          jenis_soal: jenis_soal
        }
      });

      return res.json({
        status: 'OK',
        message: '',
        data: jawaban
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        message: err,
        data: {}
      });
    }
  },

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
      
      const list_peserta = await db.peserta.list(event_test.id);
      
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
      const peserta = await db.peserta.findByPk(req.params.id);

      if(!peserta)
        return res.status(404).json({
          status: 'ERROR',
          messages: 'Data not found!',
          data: {}
        });
      
      if(req.body.id) {
        delete req.body.id
      }
      
      await db.peserta.update(req.body, { where: {id: req.params.id} });
      await db.user.update(req.body, {where: {email: peserta.email}});

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

  delete: async (req, res) => {
    try {
      const peserta = await db.peserta.findByPk(req.params.id);
      
      if(!peserta) {
        return res.status(404).json({
          messages: 'Peserta not found!',
          data: {}
        })
      }
      console.log("id:", peserta.jadwal_test)
      const jadwaltest = await db.jadwalTest.findByPk(peserta.jadwal_test);
      
      if(!jadwaltest) {
        return res.status(404).json({
          messages: 'Data not found!',
          data: {}
        })
      }
      
      if(moment().isSameOrBefore(jadwaltest.waktu)) {
        await db.peserta.destroy({
          where: {
            id: req.params.id
          }
        });
        res.json({
          status: 'OK',
          messages: 'Success delete data.',
          data: {}
        });
      } else {
        res.json({
          status: 'ERROR',
          messages: 'delete peserta gagal.',
          data: {}
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

  welcomeEmail: async (req, res) => {
    try {
      const to = req.params.email;
      const id_jadwaltest = req.params.jadwaltest;
      
      const event = await db.jadwalTest.findByPk(id_jadwaltest);
      const peserta = await db.peserta.findOne({where: {email: to, jadwal_test: id_jadwaltest}});

      if(!event || !peserta) {
        return res.status(404).json({
          messages: 'jadwal test atau email peserta tidak ditemukan!',
          data: {}
        })
      }

      const user = await db.user.findOne({where: {email: to}});

      const data = {
        tanggal: moment(event.waktu).format('DD-MM-YYYY [jam] HH:mm [WIB]'),
        nama: user.nama,
        password: peserta.password
      }
      
      const html = email_helper.welcomeTemplate(data);
      
      const data_email = {
        from: process.env.EMAIL_USER, // sender address
        to: to, // list of receivers
        subject: `Selamat datang peserta ${process.env.APP_NAME}`, // Subject line
        text: `Selamat anda telah ditambahkan dalam ujian tes minat bakat ${process.env.APP_NAME}.`, // plain text body
        html: html, // html body
      }

      email_helper.sendEmail(data_email);

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