// Update with your config settings.

module.exports = {

  local : {
    client: 'sqlite3',
    connection: { filename: ':memory'},
    useNullAsDefault: true,
    migrations: {
        directory: __dirname + '/migrations'
    }
  },

  dev: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      database: 'catchernet',
      user:     'postgres',
      password: 'postgres'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds/dev'
    }
  },

  staging: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      database: 'catchernet',
      user:     'catchernet',
      password: 'catchernet2018'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations'
    },
    seeds: {
      directory: __dirname + '/seeds/staging'
    }
  },

  prod: {
    client: 'pg',
    connection: {
      host: process.env.PG_HOST,
      database: 'catchernet',
      user:     'catchernet',
      password: 'catchernet2018'
    },
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: __dirname + '/migrations'
    }
  }
};      

