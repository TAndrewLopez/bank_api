import dotenv from "dotenv";
import { Dialect, Sequelize } from "sequelize";

dotenv.config();

const database = process.env.DB_NAME as string;
const username = process.env.DB_USERNAME as string;
const password = process.env.DB_PASSWORD as string;
const dialect = process.env.DB_DIALECT as Dialect;
const host = process.env.DB_HOST as string;

const sequelize = new Sequelize(database, username, password, {
    host,
    dialect,
    logging: false,
});

export default sequelize;
