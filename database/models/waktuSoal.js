'use strict';
module.exports = (sequelize, DataTypes) => {
  const waktuSoal = sequelize.define('waktuSoal', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jenis_soal: DataTypes.STRING,
    paket_soal: DataTypes.STRING,
    waktu: DataTypes.INTEGER
  }, {
    tableName: 'waktu_soal',
    timestamps: false,
  });
  waktuSoal.associate = function(models) {
    // associations can be defined here
  };
  return waktuSoal;
};