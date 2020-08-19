'use strict';
const { Op } = require ('sequelize');
module.exports = (sequelize, DataTypes) => {
  const scorePeserta = sequelize.define('scorePeserta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    kode_soal: DataTypes.STRING,
    rw: DataTypes.INTEGER,
    sw: DataTypes.DECIMAL(4, 1),
    kategori: DataTypes.STRING,
    peserta_id: DataTypes.INTEGER
  }, {
    tableName: 'score_peserta',
    timestamps: false,
  });
  scorePeserta.associate = function(models) {
    scorePeserta.belongsTo(models.peserta, {
      foreignKey: 'peserta_id'
    });
  };

  scorePeserta.getIQ = async (peserta_id, umur) => {
    let sum_rw = await scorePeserta.sum('rw', {where: {
      peserta_id: peserta_id,
      kategori: {
        [Op.not]: 'mii'
      }
    }});

    if(isNaN(sum_rw)) {
      return 0;
    }
    let look_sw = await sequelize.query(
      'SELECT sw FROM score_subtest WHERE kode_soal = ? AND rw = ? AND umur = ?',
      {
        replacements: ['gesampt', sum_rw, umur],
        type: sequelize.QueryTypes.SELECT
      }
    );
    if(look_sw[0].sw==0) {
      return 0;
    }
    let look_iq = await sequelize.query(
      'SELECT sw FROM score_subtest WHERE kode_soal = ? AND rw = ?',
      {
        replacements: ['iq', look_sw[0].sw],
        type: sequelize.QueryTypes.SELECT
      }
    );
    return look_iq[0].sw;
  }

  scorePeserta.getJurusan = async (peserta_id) => {
    const ge = await scorePeserta.findOne({
      attributes: ['sw'],
      where: {
        peserta_id: peserta_id,
        kode_soal: 'GE'
      }
    });

    const ra = await scorePeserta.findOne({
      attributes: ['sw'],
      where: {
        peserta_id: peserta_id,
        kode_soal: 'RA'
      }
    });

    const an = await scorePeserta.findOne({
      attributes: ['sw'],
      where: {
        peserta_id: peserta_id,
        kode_soal: 'AN'
      }
    });

    const zr = await scorePeserta.findOne({
      attributes: ['sw'],
      where: {
        peserta_id: peserta_id,
        kode_soal: 'ZR'
      }
    });

    const eksak = parseFloat(ge.sw) + parseFloat(ra.sw);
    const noneksak = parseFloat(an.sw) + parseFloat(zr.sw);
    
    const seimbang = eksak-noneksak;
    
    if(seimbang>= -10 && seimbang<=10) {
      return 'Seimbang';
    } else if(eksak>noneksak) {
      return 'Eksak';
    } else {
      return 'Non Eksak'
    }
  }
  return scorePeserta;
};