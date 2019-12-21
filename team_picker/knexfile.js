module.exports = {

  development: {
    client: 'pg',
    connection: {
      database: 'week4'
    },
    migrations: {
      directory: 'db/migrations'
    },
    seeds: {
      directory: 'db/seeds'
    }
  },
};