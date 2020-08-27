'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('admin', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      email: {        
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      role: {
        type: Sequelize.STRING
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,        
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,        
      },
      deleted_at: {
        allowNull: true,
        type: Sequelize.DATE
      },
      change_password: {
        allowNull: true,
        type: Sequelize.DATE
      }
    }, {
      timestamps: true
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('admin');
  }
};