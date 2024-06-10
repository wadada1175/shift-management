import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  "shift_management",
  "your_username",
  "your_password",
  {
    host: "localhost",
    dialect: "postgres",
  }
);

const db: any = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.shifts = require("./Shift").default(sequelize, Sequelize);

export default db;
