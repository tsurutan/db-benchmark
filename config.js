const pg = require('knex')({
    client: 'pg',
    connection: {
        host: "localhost",
        port: "5432",
        user: "admin",
        database: "test_database",
        password: "admin",
    }
});
const mysql = require('knex')({
    client: 'mysql',
    connection: {
        host: "localhost",
        port: "3306",
        user: "root",
        password: "admin",
        database: "test_database",
    }
});

module.exports = {pg, mysql}
