const db = require('../database/models/index');


module.exports = {
  test: async (req, res) => {
    const check_test = await db.jadwalTest.findByPk(req.params.id);
    if(check_test==null) {
      return res.json({
        status: 'ERROR',
        messages: 'Jadwal test not found',
        data: {}
      });
    }
    const list_peserta = await db.peserta.findAll({
      attributes: ['id'],
      where: {
        jadwal_test: req.params.id
      }
    });

    const peserta = list_peserta.map(x => x.id);
    
    await Promise.all([
      db.logSoalPeserta.destroy({
        where: {
          peserta_id: peserta,
        },
      }),
      db.scorePeserta.destroy({
        where: {
          peserta_id: peserta,
        },
      }),
      db.jawaban.destroy({
        where: {
          peserta_id: peserta,
        },
      }),
    ]);
    
    res.json({
      status: 'OK',
      messages: `All answers on Test ${req.params.id} deleted successfully`,
      data: {}
    });
  },

  subtest: async (req, res) => {
    const kode_soal = {
      subtest_1_ist: "SE",
      subtest_2_ist: "WA",
      subtest_3_ist: "AN",
      subtest_4_ist: "GE",
      subtest_5_ist: "RA",
      subtest_6_ist: "ZR",
      subtest_7_ist: "FA",
      subtest_8_ist: "WU",
      subtest_9_ist: "ME",
      bagian_1_verb_ling: "M1",
      bagian_2_log_math: "M2",
      bagian_3_spat: "M3",
      bagian_4_mus: "M4",
      bagian_5_bod_kin: "M5",
      bagian_6_inter: "M6",
      bagian_7_intra: "M7",
      bagian_8_nat: "M8"
    }

    if(kode_soal[req.params.code_subtest] == null) {
      return res.json({
        status: 'ERROR',
        messages: 'code subtest not found',
        data: {}
      });
    }

    await Promise.all([
      db.logSoalPeserta.destroy({
        where: {
          peserta_id: req.params.id_peserta,
          paket_soal: req.params.code_subtest
        },
      }),
      db.scorePeserta.destroy({
        where: {
          peserta_id: req.params.id_peserta,
          kode_soal: kode_soal[req.params.code_subtest]
        },
      }),
      db.jawaban.destroy({
        where: {
          peserta_id: req.params.id_peserta,
          paket_soal: req.params.code_subtest
        },
      }),
    ]);

    res.json({
      status: 'OK',
      messages: `All answers on Peserta ${req.params.id_peserta} subtest ${req.params.code_subtest} deleted successfully`,
      data: {}
    });
  },

  peserta: async (req, res) => {
    await Promise.all([
      db.logSoalPeserta.destroy({
        where: {
          peserta_id: req.params.id_peserta,
        },
      }),
      db.scorePeserta.destroy({
        where: {
          peserta_id: req.params.id_peserta,
        },
      }),
      db.jawaban.destroy({
        where: {
          peserta_id: req.params.id_peserta,
        },
      }),
    ]);

    res.json({
      status: 'OK',
      messages: `All answers on Peserta ${req.params.id_peserta} deleted successfully`,
      data: {}
    });
  }
}