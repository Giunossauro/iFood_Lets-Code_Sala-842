const knex = require ('knex')

module.exports = knex({
    client:'postgres',
    connection: {
        host: 'localhost',
        user: 'postgres',
        password: 'SenhadoGiu!',
        database: 'cinema',
        port: '5432',
    },
});
