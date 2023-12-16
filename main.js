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

(async () => {
    const dbs = [mysql, pg]
    for (const db of dbs) {
        // await db.schema.createTableIfNotExists("users", function (table) {
        //     table.increments()
        //     table.text("name")
        //     table.text("email")
        // })
        // await db.schema.createTableIfNotExists("profiles", function (table) {
        //     table.increments()
        //     table.integer("user_id").unsigned().references("users.id")
        //     table.integer("age")
        // })
        await db.schema.createTableIfNotExists("polygons", function (table) {
            table.increments()
            table.geometry("geom").notNullable()
        })
    }
})()
