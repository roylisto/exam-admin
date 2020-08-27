const { jadwalTest } = require('../database/models/index.js');
const { Op } = require('sequelize');
const moment = require('moment');
module.exports = {
  create: (req, res) => {
    jadwalTest.create(req.body).then(result => {
      res.json({
        status: 'OK',
        messages: 'Success insert data.',
        data: result
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
    jadwalTest.update(req.body, {
      where: {
        id: req.params.id
      }
    }).then(result => {
      res.json({
        status: 'OK',
        messages: 'Success update data.',
        data: {}
      });
    }).catch( err => {
      res.status(400).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    });
  },

  get: (req, res) => {
    jadwalTest.findByPk(req.params.id).then(result => {
      if(result==null) {
        return res.status(404).json({
          status: 'OK',
          messages: 'Data Not Found!',
          data: {}
        });  
      }
      res.json({
        status: 'OK',
        messages: '',
        data: result
      });
    }).catch( err => {
      res.status(400).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    });
  },

  list: async (req, res) => {
    try {
      let query = {};
      
      if(req.query.date == 'true') {        
        query = {
          where: {
            waktu: {
              [ Op.gte ] : moment().toDate()
            }
          }
        }
      } 
      const event = await jadwalTest.findAll(query);

      return res.json({
        status: 'OK',
        messages: '',
        data: event
      });
    } catch(err) {
      res.status(500).json({
        status: 'ERROR',
        messages: err,
        data: {}
      });
    }
  },

  delete: (req, res) => {
    jadwalTest.destroy({
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