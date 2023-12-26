import { dbConfig } from "./mysqlConfig";
import { Sequelize, DataTypes, Op } from "sequelize";

const connection = new Sequelize(
  dbConfig.DB,
  dbConfig.USER,
  dbConfig.PASSWORD,
  {
    host: dbConfig.HOST,
    dialect: "mysql"
  }
);

async function connectDataBase() {
  try {
    await connection.authenticate();
    console.log('Connection has been established successfully');
  } catch (error) {
    console.error('Unable to connect to the database', error);
  }
}

export { connection, connectDataBase, DataTypes, Op };