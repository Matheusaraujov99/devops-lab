import { Sequelize } from "sequelize";

const sequelize = new Sequelize(
  process.env.DB_NAME || "devopsdb",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "123456",
  {
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT) || 5433,
    dialect: "postgres",
    logging: false,
  }
);

export default sequelize;
