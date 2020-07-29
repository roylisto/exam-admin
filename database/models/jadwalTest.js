'use strict';

module.exports = (sequelize, DataTypes) => {
  const jadwalTest = sequelize.define('jadwalTest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    waktu: {
      type: DataTypes.DATE,
    },
    instansi: DataTypes.STRING,
    expired: DataTypes.DATE,
    keterangan: DataTypes.STRING
  }, {
    tableName: 'jadwal_test',
    underscored: true,
    timestamps: true
  });
  jadwalTest.associate = function(models) {
    // associations can be defined here
  };
  return jadwalTest;
};