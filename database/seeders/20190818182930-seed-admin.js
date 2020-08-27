'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10);
    return queryInterface.bulkInsert('admin', [{
      name: 'Admin Educasia',
      email: 'exam.admin@educasia.id',
      password: bcrypt.hashSync('helloworld', salt),      
      role: 'superadmin',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Admin satu',
      email: 'ana@educasia.id',
      password: bcrypt.hashSync('12345678', salt),      
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});   
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admin', null, {});
  }
};
