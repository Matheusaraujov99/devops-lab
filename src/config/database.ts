import { Sequelize, Options } from "sequelize";
import dotenv from "dotenv";

dotenv.config(); // 🔹 garante que o .env seja lido

const useSSL = process.env.DB_SSL === "true";

const connectionOptions: Options = {
  host: process.env.DB_HOST || "localhost",
  port: parseInt(process.env.DB_PORT || "5432", 10),
  dialect: "postgres",
  logging: false,
  dialectOptions: useSSL
    ? {
        ssl: {
          require: true,
          rejectUnauthorized: false, // 🔹 obrigatório no Azure
        },
      }
    : {},
};

console.log(
  useSSL
    ? `🔐 Conectando COM SSL ao banco em: ${process.env.DB_HOST}`
    : `⚠️ Conectando SEM SSL ao banco em: ${process.env.DB_HOST || "localhost"}`
);

const sequelize = new Sequelize(
  process.env.DB_NAME || "devopsdb",
  process.env.DB_USER || "postgres",
  process.env.DB_PASSWORD || "123456",
  connectionOptions
);

export async function connectDB() {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexão com o banco estabelecida com sucesso.");

    await sequelize.sync({ alter: true });
    console.log("📦 Schema sincronizado (tabelas verificadas/criadas).");
  } catch (error) {
    console.error("❌ Erro ao conectar ou sincronizar o banco:", error);
  }
}

export default sequelize;