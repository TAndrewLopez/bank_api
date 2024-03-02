import UserModel from '../models/userModel'
import db from './'

const db_init = async () => {
    try {
        await db.authenticate()
        UserModel.sync({ alter: false });
        console.log("Connection has been established successfully.")
    } catch (error) {
        console.error("Unable to connect to the database", error);
    }
}

export default db_init;