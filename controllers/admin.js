const db = require('../database/models');
const bcrypt = require('bcrypt');
const moment = require('moment');
const salt = bcrypt.genSaltSync(10);

module.exports = {
  reset_password: async (req, res) => {
    try {
      if(req.body.old_password) {
        const admin = await db.admin.findByPk(req.decoded.data.id);        
        const check = await bcrypt.compare(req.body.old_password, admin.password);
        if (check) {
          await db.admin.update({
            password: bcrypt.hashSync(req.body.new_password, salt),
            change_password: moment().format('YYYY-MM-DD HH:mm:ss')
          }, {
            where: {
              id: req.decoded.data.id
            }
          });

          return res.json({
            status: 'OK',
            message: 'Success change password.',
            data: {}
          });
        }
      }

      res.status(500).json({
        status: 'ERROR',
        message: 'Wrong old password!',
        data: {}
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        message: err,
        data: {}
      });
    }
  },

  create: async (req, res) => {
    try {
      const admin = await db.admin.create({
        name: req.body.name,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, salt),
        role: 'admin'
      });

      res.json({
        status: 'OK',
        message: 'Success insert admin',
        data: admin
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        message: err
      });
    }
  },

  update: async (req, res) => {
    try {
      let data_admin = {
        name: req.body.name,
        email: req.body.email,
      }

      if(req.body.password) {
        data_admin.password = bcrypt.hashSync(req.body.password, salt);
        data_admin.change_password = moment().format('YYYY-MM-DD HH:mm:ss');
      }

      const admin = await db.admin.update(data_admin, {
        where: {
          id: req.params.id
        }
      });

      res.json({
        status: 'OK',
        message: 'Success update admin',
        data: admin
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        message: err
      });
    }
  },

  list: async (req, res) => {
    try {
      const admin = await db.admin.findAll({
        where: {
          role: 'admin'
        }
      });

      res.json({
        status: 'OK',
        message: '',
        data: admin
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        message: err
      });
    }
  },

  get: async (req, res) => {
    try {
      const admin = await db.admin.findOne({
        where: {
          role: 'admin',
          id: req.params.id
        }
      });

      if(admin==null) {
        return res.json({
          status: 'OK',
          message: 'Data not found!',
          data: null
        });
      }
      res.json({
        status: 'OK',
        message: '',
        data: admin
      });
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        message: err
      });
    }
  },

  delete: (req, res) => {
    db.admin.destroy({
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