'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn('peserta', 'jenis_test', { type: Sequelize.STRING })
    ]);
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('peserta', 'jenis_test', {})
    ]);
  }
};
