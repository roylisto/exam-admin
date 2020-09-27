'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    const salt = bcrypt.genSaltSync(10);
    return queryInterface.bulkInsert('admin', [{
      name: 'Superadmin',
      email: 'superadmin@educasia.id',
      password: bcrypt.hashSync('Palembang#2021', salt),
      role: 'superadmin',
      created_at: new Date(),
      updated_at: new Date(),
    }, {
      name: 'Admin',
      email: 'admin@bakatku.id',
      password: bcrypt.hashSync('BinaHuman#2020', salt),
      role: 'admin',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('admin', null, {});
  }
};
