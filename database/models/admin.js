'use strict';
module.exports = (sequelize, DataTypes) => {
  const admin = sequelize.define('admin', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING, 
    change_password: DataTypes.DATE
  }, {
    tableName: 'admin',
    timestamps: true,
  });
  admin.associate = function(models) {
    // associations can be defined here
  };
  return admin;
};