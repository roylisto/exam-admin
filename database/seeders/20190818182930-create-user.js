'use strict';

const bcrypt = require('bcrypt');

module.exports = {
  up: (queryInterface, Sequelize) => {
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
    const salt = bcrypt.genSaltSync(10);
    return queryInterface.bulkInsert('users', [{
      name: 'Admin',
      email: 'admin@gmail.com',
      password: bcrypt.hashSync('helloworld', salt),      
      createdAt: new Date(),
      updatedAt: new Date(),
    }], {});   
  },

  down: (queryInterface, Sequelize) => {
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
    return queryInterface.bulkDelete('users', null, {});
  }
};
