const {mysql, pg} = require("./config");
const knexPostgis = require('knex-postgis')

const dbs = [pg,mysql];

(async () => {
    for (const db of dbs) {
        const st = knexPostgis(db)
        for (let i = 0; i < 1000; i++) {
            const offset = 10000 * i;
            const data = [...Array(10000)].map((_, index) => ({
                geom: st.geomFromText('POLYGON((0 0,10 0,10 10,0 10,0 0),(5 5,7 5,7 7,5 7,5 5))'),
            }))
            await db("polygons").insert(data)
            console.log(`seq = ${i}`)
        }
    }
})();
