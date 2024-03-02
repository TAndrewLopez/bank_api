import db from './index'

const db_init = async () => {
    try {
        await db.authenticate()
        console.log("Connection has been established successfully.")
    } catch (error) {
        console.error("Unable to connect to the database", error);
    }
}

export default db_init;