const db = require('../database/models/index.js');

const hitungScore = async (peserta, jawaban, paket_soal, jenis_soal) => {
  const references = await db.listReferences.findAll();
  const kode_soal = {};
  for(const ref of references) {
    kode_soal[ref.value] = ref.code;
  }  

  const account = await user.findOne({
    where: {
      email: peserta.email
    }
  });

  let rw_peserta = 0;
  if(jenis_soal=='ist') {
    const ist = await soalIST.findAll({
      attributes: ['kunci_jawaban'],
      where: {
        paket_soal: paket_soal
      }
    });
    let kunci_ist = ist.map(x => x.kunci_jawaban);
    if(paket_soal=='subtest_1_ist' || paket_soal=='subtest_2_ist' || paket_soal=='subtest_3_ist'
        || paket_soal=='subtest_7_ist' || paket_soal=='subtest_8_ist' || paket_soal=='subtest_9_ist') {
      kunci_ist.forEach((row, index) => {
        if(row==jawaban[index]) {
          rw_peserta++;
        }
      });
    } else if(paket_soal=='subtest_5_ist' || paket_soal=='subtest_6_ist') {
      kunci_ist.forEach((row, index) => {
        let tmp_jawaban = jawaban[index];
        if(Array.isArray(tmp_jawaban)) {
          tmp_jawaban.sort()
          if(row==tmp_jawaban.join("")) {
            rw_peserta++;
          }
        }
      });
    } else if(paket_soal=='subtest_4_ist') {
      kunci_ist.forEach((row, index) => {
        if(jawaban[index]) {
          let tmp_row = JSON.parse(row);
          let tmp_jawaban = jawaban[index].toLowerCase();
          if(tmp_row[tmp_jawaban]) {
            rw_peserta = rw_peserta+tmp_row[tmp_jawaban];
          }
        }
      });
    }
    console.log("rw: ", rw_peserta);
    let umur = moment().diff(account.tanggal_lahir, 'years');

    if (umur<13) {
      umur = 13;
    } else if(umur>18 && umur<=20) {
      umur = 20;
    } else if(umur>20 && umur <= 24) {
      umur = 24;
    } else if(umur>24 && umur <= 28) {
      umur = 28;
    } else if(umur>28 && umur <= 33) {
      umur = 33;
    } else if(umur>33 && umur <= 39) {
      umur = 39;
    } else if(umur>39 && umur <= 45) {
      umur = 45;
    } else if(umur >= 46) {
      umur = 46;
    }
    const score_subtest = await scoreSubtest.findOne({
      where: {
        kode_soal: kode_soal[paket_soal],
        rw: rw_peserta,
        umur: umur
      }
    });

    let kategori = 'Sangat Rendah';
    if(score_subtest.sw>80 && score_subtest.sw<=94) {
      kategori = 'Rendah';
    } else if(score_subtest.sw > 94 && score_subtest.sw <= 99) {
      kategori = 'Sedang';
    } else if(score_subtest.sw > 99 && score_subtest.sw <= 104) {
      kategori = 'Cukup';
    } else if(score_subtest.sw > 104 && score_subtest.sw <= 118) {
      kategori = 'Tinggi';
    } else if(score_subtest.sw > 118) {
      kategori = 'Sangat Tinggi';
    }

    scorePeserta.create({
      kode_soal: score_subtest.kode_soal,
      rw: score_subtest.rw,
      sw: score_subtest.sw,
      kategori: kategori,
      peserta_id: peserta.id
    });
  } else if(jenis_soal=='mii') {
    let jumlah_ya = jawaban.filter(x => x==='ya').length;
    console.log("ya: ", jumlah_ya);
    scorePeserta.create({
      kode_soal: kode_soal[paket_soal],
      rw: jumlah_ya,
      sw: jumlah_ya,
      kategori: 'mii',
      peserta_id: peserta.id
    });
  }
}

module.exports = {
  resetAllPeserta: async (req, res) => {
    try {
      const id_jadwaltest = req.params.id_test;

      const event = await db.jadwalTest.findByPk(id_jadwaltest);
      if(!event)
        return res.status(404).json({
          status: 'ERROR',
          message: 'Jadwal test not found!',
          data: {}
        })
      
      const list_peserta = await db.peserta.findAll({where: {jadwal_test: id_jadwaltest}});

      const list_id_peserta = list_peserta.map(x => x.id);

      //delete all score peserta
      await db.scorePeserta.destroy({
        where: {
          id: list_id_peserta
        }
      });
      
      
      //hitung score all peserta
      for(const peserta of list_peserta) {
        const jawaban = await db.jawaban.findAll({where: {peserta_id: peserta.id}});
        hitungScore(1,1,1,1);
        return res.send(jawaban);  
      }

    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        message: err,
        data: {}
      });
    }
  }
}