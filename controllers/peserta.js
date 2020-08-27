const { peserta, jadwalTest, sequelize } = require('../database/models/index.js');
// const { QueryTypes } = require('sequelize');
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
      const account_peserta = await peserta.findByPk(req.params.id);
      if(account_peserta==null) {
        return res.status(404).json({
          status: 'ERROR',
          messages: 'Data not found.',
          data: {}
        });
      }
      const account = await peserta.getAccount(account_peserta.email, account_peserta.id);

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
      const event_test = await jadwalTest.findByPk(req.params.id);    
      if(event_test === null) {
        return res.status(404).json({
          message: 'Jadwal test not found!'
        });
      }

      const list_peserta = await sequelize.query("SELECT * FROM user JOIN peserta ON user.email=peserta.email WHERE peserta.jadwal_test=?", {
        replacements: [event_test.id],
        type: sequelize.QueryTypes.SELECT
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
          expired: moment(test.expired).add(1, 'days').format('YYYY-MM-DD HH:mm:ss'),
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

  update: async (req, res) => {
    try {
      const query = await peserta.update({
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