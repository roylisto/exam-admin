const { peserta, jadwalTest } = require('../database/models/index.js');
const randomstring = require("randomstring");
const moment = require('moment');

module.exports = {
  list: (req, res) => {
    peserta.findAll().then( result => {
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
      const event_test = await jadwalTest.findByPk(req.params.id);    
      if(event_test === null) {
        return res.status(404).json({
          message: 'Jadwal test not found!'
        });
      }

      const list_peserta = await peserta.findAll({
        where: { jadwal_test: event_test.id }
      });

      const jumlah_peserta = await peserta.count({
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

      let test = await jadwalTest.findByPk(jadwal_test);

      user_email.forEach(row => {
        calon_peseta.push({
          email: row,
          password: randomstring.generate(8),
          valid: test.waktu,
          expired: moment(test.waktu).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
          jadwal_test: jadwal_test
        });
      });

      peserta.bulkCreate(calon_peseta);

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

  delete: (req, res) => {
    peserta.destroy({
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
  }
}