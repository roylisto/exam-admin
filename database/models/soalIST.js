'use strict';
module.exports = function(sequelize, DataTypes) {
  let soalIST = sequelize.define('soalIST', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nomor: {
      type: DataTypes.INTEGER
    },
    kategori: {        
      type: DataTypes.STRING
    },
    paket_soal: {
      type: DataTypes.STRING,
      set(value) {
        value = value.replace(/ /g,"_");                
        this.setDataValue('paket_soal', value.toLowerCase())
      }
    },
    pertanyaan: {        
      type: DataTypes.TEXT
    },
    kunci_jawaban: {        
      type: DataTypes.STRING
    },
    pilihan: {        
      type: DataTypes.TEXT,
      get() {
        let rawValue = this.getDataValue('pilihan')
        return rawValue? JSON.parse(rawValue) : null
      }
    }
  }, {    
    tableName: 'soal_ist',
    underscored: true,
    timestamps: false,
  });

  return soalIST;
};