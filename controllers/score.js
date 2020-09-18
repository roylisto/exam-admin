const db = require('../database/models/index.js');
const moment = require('moment');
const hitungScore = async (peserta, jawaban, paket_soal, jenis_soal, kode_soal, umur) => {
  try {    
    let rw_peserta = 0;    
    if(jenis_soal=='ist') {
      if(jawaban!=null) {
        const ist = await db.soalIST.findAll({
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
            if(jawaban[index] && jawaban[index]!='#') {
              let tmp_row = JSON.parse(row);
              let tmp_jawaban = jawaban[index].toLowerCase();
              if(tmp_row[tmp_jawaban]) {
                rw_peserta = rw_peserta+tmp_row[tmp_jawaban];
              }
            }
          });
        }      
      }
      
      const score_subtest = await db.scoreSubtest.findOne({
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

      db.scorePeserta.create({
        kode_soal: score_subtest.kode_soal,
        rw: score_subtest.rw,
        sw: score_subtest.sw,
        kategori: kategori,
        peserta_id: peserta.id
      });
    } else if(jenis_soal=='mii') {
      let jumlah_ya = 0;
      if(jawaban!=null) {
        jumlah_ya = jawaban.filter(x => x==='ya').length;
      }
      
      db.scorePeserta.create({
        kode_soal: kode_soal[paket_soal],
        rw: jumlah_ya,
        sw: jumlah_ya,
        kategori: 'mii',
        peserta_id: peserta.id
      });
    }
  } catch (err) {
    console.error
  }
}

module.exports = {
  resetScorePeserta: async (req, res) => {
    try {
      const id_jadwaltest = req.params.id_test;
      const id_peserta = req.params.id_peserta;
      
      const event = await db.jadwalTest.findByPk(id_jadwaltest);
      if(!event)
        return res.status(404).json({
          status: 'ERROR',
          message: 'Jadwal test not found!',
          data: {}
        })
      if(moment().isSameOrBefore(event.waktu, 'day'))
        return res.status(401).json({
          status: 'ERROR',
          message: 'Scoring hanya bisa dilakukan minimal 1 hari sesudah hari tes!',
          data: {}
        })
      let query = {where: {jadwal_test: id_jadwaltest}};
      if(id_peserta) {
        console.log('ada id')
        query = {
          where: {jadwal_test: id_jadwaltest, id: id_peserta}
        }
      } 

      const list_peserta = await db.peserta.findAll(query);
      if(!list_peserta) {
        return res.status(404).json({
          status: 'ERROR',
          message: 'Peserta tidak ditemukan.',
          data: {}
        })
      }
      const list_id_peserta = list_peserta.map(x => x.id);
      
      // delete all score peserta
      await db.scorePeserta.destroy({
        where: {
          peserta_id: list_id_peserta
        }
      });
            
      //hitung score all peserta
      const references = await db.listReferences.findAll();
      const kode_soal = {};
      for(const ref of references) {
        kode_soal[ref.value] = ref.code;
      }  

      const soal_ist = [
        "subtest_1_ist", "subtest_2_ist", "subtest_3_ist", "subtest_4_ist", "subtest_5_ist",
        "subtest_6_ist", "subtest_7_ist", "subtest_8_ist", "subtest_9_ist"
      ];

      const soal_mii = [
        "bagian_1_verb_ling", "bagian_2_log_math", "bagian_3_spat", "bagian_4_mus", "bagian_5_bod_kin",
        "bagian_6_inter", "bagian_7_intra", "bagian_8_nat"
      ];
      
      //hitung score per peserta
      for(const peserta of list_peserta) {
        const account = await db.user.findOne({
          where: {
            email: peserta.email
          }
        });

        if(!account) {
          return res.status(500).json({
            status: 'ERROR',
            message: 'Ada peserta yg tidak punya akun.',
            data: peserta.email
          })
        }
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
        
        for(let i=0; i<soal_ist.length; i++) {
          let jawaban = null;
          const jawaban_peserta = await db.jawaban.findOne({
            where: {
              peserta_id: peserta.id, 
              paket_soal: soal_ist[i],
              jenis_soal: 'ist'
            }
          });
          if(jawaban_peserta) {
            jawaban = jawaban_peserta.jawaban_peserta
          }
          hitungScore(peserta, jawaban, soal_ist[i], 'ist', kode_soal, umur);
        }

        for(let i=0; i<soal_mii.length; i++) {
          let jawaban = null;
          const jawaban_peserta = await db.jawaban.findOne({
            where: {
              peserta_id: peserta.id, 
              paket_soal: soal_mii[i],
              jenis_soal: 'mii'
            }
          });
          if(jawaban_peserta) {
            jawaban = jawaban_peserta.jawaban_peserta
          }
          
          hitungScore(peserta, jawaban, soal_mii[i], 'mii', kode_soal, umur);
        }
      }

      return res.json({
        status: 'OK',
        message: 'Hitung score success.',
        data: {}
      })
    } catch (err) {
      res.status(500).json({
        status: 'ERROR',
        message: err,
        data: {}
      });
    }
  }  
}