const {pg, mysql} = require("./config");


(async () => {
    for (const db of [pg, mysql]) {
        for (let i = 0; i < 1; i++) {
            const users = await pg("users").offset(i).limit(10000)
            const data = users.map((user, index) => ({
                age: index,
                user_id: user.id
            }))
            await db("profiles").insert(data)
            console.log(`seq = ${i}`)
        }
    }
})();
