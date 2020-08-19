'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('jadwal_test', 'deleted_at', { type: Sequelize.DATE })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('jadwal_test', 'deleted_at', {})
    ]);
  }
};
