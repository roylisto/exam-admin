require('dotenv').config(`${__dirname}/../.env`);

module.exports = {
  "development": {
    "username": process.env.DB_USERNAME_DEVELOPMENT,
    "password": process.env.DB_PASSWORD_DEVELOPMENT,
    "database": process.env.DB_DATABASE_DEVELOPMENT,
    "host": process.env.DB_HOST_DEVELOPMENT,
    "dialect": "mysql",
    "define": {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    },
    "logging": console.log,
    "timezone": process.env.TZ,
    "pool": {
      min: 0,
      max: 30,
    }
  },
  "staging": {
    "username": process.env.DB_USERNAME_STAGING,
    "password": process.env.DB_PASSWORD_STAGING,
    "database": process.env.DB_DATABASE_STAGING,
    "host": process.env.DB_HOST_STAGING,
    "dialect": "mysql",
    "define": {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    },
    "logging": false,
    "timezone": process.env.TZ,
    "pool": {
      min: 0,
      max: 30,
    }
  },
  "production": {
    "username": process.env.DB_USERNAME_PRODUCTION,
    "password": process.env.DB_PASSWORD_PRODUCTION,
    "database": process.env.DB_DATABASE_PRODUCTION,
    "host": process.env.DB_HOST_PRODUCTION,
    "dialect": "mysql",
    "define": {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at'
    },
    "logging": false,
    "timezone": process.env.TZ,
    "pool": {
      min: 0,
      max: 30,
    }
  }
};