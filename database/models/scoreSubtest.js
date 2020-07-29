'use strict';
module.exports = (sequelize, DataTypes) => {
  const scoreSubtest = sequelize.define('scoreSubtest', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    rw: DataTypes.INTEGER,
    kode_soal: DataTypes.STRING,
    sw: DataTypes.DECIMAL(4, 1),
    umur: DataTypes.INTEGER
  }, {
    tableName: 'score_subtest',
    timestamps: false,
  });
  scoreSubtest.associate = function(models) {
    // associations can be defined here
  };
  return scoreSubtest;
};