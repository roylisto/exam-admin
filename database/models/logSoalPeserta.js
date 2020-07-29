'use strict';
module.exports = (sequelize, DataTypes) => {
  const logSoalPeserta = sequelize.define('logSoalPeserta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    peserta_id: DataTypes.INTEGER,
    jenis_soal: DataTypes.STRING,
    paket_soal: DataTypes.STRING,    
  }, {
    tableName: 'log_soal_peserta',
    underscored: true,
    timestamps: true,
    updatedAt: false
  });
  logSoalPeserta.associate = function(models) {
    // associations can be defined here
  };
  return logSoalPeserta;
};