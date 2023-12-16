const {mysql, pg} = require("./config");

const dbs = [pg, mysql];

(async () => {
    for (const db of dbs) {
        for (let i = 0; i < 1000; i++) {
            const offset = 10000 * i;
            const data = [...Array(10000)].map((_, index) => ({
                name: `${offset + index}name`,
                email: `${offset + index}@gmail`
            }))
            await db("users").insert(data)
            console.log(`seq = ${i}`)
        }
    }
})();
