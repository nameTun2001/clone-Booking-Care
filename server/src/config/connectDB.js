// const { Sequelize } = require("sequelize");
import { Sequelize } from "sequelize";

const sequelize = new Sequelize("testdatabase", "root", null, {
  host: "localhost",
  dialect: "mysql",
  logging: false
});
const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("unable to connect to the database:", error);
  }
};

// module.exports = connectDB;
export default connectDB;
