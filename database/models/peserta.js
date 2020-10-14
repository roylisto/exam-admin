'use strict';
module.exports = function(sequelize, DataTypes) {
  let peserta = sequelize.define('peserta', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    email: {        
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING,
      set(value) {
        this.setDataValue('password', value.toUpperCase())
      }
    },
    valid: {        
      type: DataTypes.DATE,
    },
    expired: {        
      type: DataTypes.DATE
    },
    jadwal_test: {
      type: DataTypes.INTEGER
    },
    jenis_test: {
      type: DataTypes.STRING,
      get() {
        const rawValue = this.getDataValue('jenis_test')
        return rawValue? rawValue.split(',') : null
      },
      set(value) {
        this.setDataValue('jenis_test', value.join(","))
      }
    }
  }, {    
    tableName: 'peserta',
    underscored: true,
    timestamps: false,
  });

  peserta.getAccount = async (email, id) => {
    const user = await sequelize.query('SELECT * FROM user JOIN peserta ON peserta.email = user.email WHERE user.email = :email AND peserta.id = :pesertaId',{
      replacements: {email, pesertaId: id},
      type: sequelize.QueryTypes.SELECT
    });
    
    if(user==null || user[0].deleted_at) {
      return false;
    }

    let jenis_test = user[0].jenis_test;
    if (user[0].jadwal_test!=null) {
      jenis_test = user[0].jenis_test.split(",");
    }

    return {
      id: user[0].id,
      nama: user[0].nama,
      email: user[0].email,
      no_hp: user[0].no_hp,
      tanggal_lahir: user[0].tanggal_lahir,
      kelompok: user[0].kelompok,
      instansi: user[0].instansi,
      jenis_kelamin: user[0].jenis_kelamin,
      password: user[0].password,
      valid: user[0].valid,
      expired: user[0].expired,
      jadwal_test: user[0].jadwal_test,
      jenis_test: jenis_test
    };
  }

  peserta.list = async (jadwal_test_id) => {
    
    const list_peserta = await sequelize.query("SELECT * FROM user JOIN peserta ON user.email=peserta.email WHERE peserta.jadwal_test = :jadwal_test_id", {
      replacements: {jadwal_test_id},
      type: sequelize.QueryTypes.SELECT
    });
    
    if(list_peserta==null) {
      return false;
    }

    const list_peserta_map = list_peserta.map(x => {
      let jenis_test = x.jenis_test;
      if (x.jenis_test!=null) {
        jenis_test = x.jenis_test.split(",");
      }

      return {
        id: x.id,
        nama: x.nama,
        email: x.email,
        no_hp: x.no_hp,
        tanggal_lahir: x.tanggal_lahir,
        kelompok: x.kelompok,
        instansi: x.instansi,
        jenis_kelamin: x.jenis_kelamin,
        password: x.password,
        valid: x.valid,
        expired: x.expired,
        jadwal_test: x.jadwal_test,
        jenis_test: jenis_test
      }
    });    

    return list_peserta_map;
  }

  peserta.associate = function(models) {
    peserta.hasMany(models.scorePeserta, {
      foreignKey: 'peserta_id'
    });
    
  };
  return peserta;
};