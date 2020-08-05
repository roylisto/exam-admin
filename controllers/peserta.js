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

  get: (req, res) => {
    peserta.findOne({
      where: { id: req.params.id }
    }).then( result => {
      if( result === null ) {
        return res.status(404).json({
          status: 'ERROR',
          messages: 'Resource Not Found!',
          data: {}
        });
      }
      res.json({
        status: 'OK',
        messages: '',
        data: result
      });
    }).catch( err => {
      res.status(500).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    });
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