'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('list_references', {
      code: {
        type: Sequelize.STRING,
        allowNull: false,
        primaryKey: true,
      },
      value: {
        type: Sequelize.STRING,
        allowNull: false,
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('list_references');
  }
};