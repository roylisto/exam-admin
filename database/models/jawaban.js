'use strict';
module.exports = (sequelize, DataTypes) => {
  const jawaban = sequelize.define('jawaban', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    jawaban_peserta: {
      type: DataTypes.TEXT,
      get() {
        const rawValue = this.getDataValue('jawaban_peserta')
        return rawValue? rawValue.split("|") : null
      },
      set(value) {
        this.setDataValue('jawaban_peserta', value.join("|"))
      }
    },
    peserta_id: DataTypes.INTEGER,
    paket_soal: DataTypes.STRING,
    jenis_soal: DataTypes.STRING
  }, {
    tableName: 'jawaban',
    updatedAt: false,
    underscored: true
  });
  jawaban.associate = function(models) {
    // associations can be defined here
  };

  return jawaban;
};