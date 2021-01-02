'use strict';
module.exports = function(sequelize, DataTypes) {
  let user = sequelize.define('user', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nama: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      validate: {
        isEmail: true
      },
      type: DataTypes.STRING
    },
    no_hp: {
      allowNull: false,
      type: DataTypes.STRING
    },
    tanggal_lahir: {
      allowNull: false,
      validate: {
        isDate: true,
      },
      type: DataTypes.DATEONLY
    },
    jenis_kelamin: {
      allowNull: true,
      type: DataTypes.STRING
    },
    kelompok: {
      allowNull: true,
      type: DataTypes.STRING
    },
    instansi: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    tableName: 'user',
    underscored: true,
    timestamps: true,
    paranoid: true
  });

  return user;
};