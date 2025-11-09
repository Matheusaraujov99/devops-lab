import { Sequelize, Options } from "sequelize";

let connectionOptions: Options = {

    host: "localhost",
    port: 5433,
    dialect: "postgres",
    logging: false,
};

if (process.env.DB_HOST) {
    console.log(`📡 Conectando ao Azure DB em: ${process.env.DB_HOST}`);
    
    connectionOptions = {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        dialect: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true, 
                rejectUnauthorized: false 
            }
        },
    };
} else {
    console.log("📡 Conectando ao banco de dados local (localhost).");
}

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
        console.log("✅ Schema sincronizado (tabelas verificadas/criadas).");

    } catch (error) {
        console.error("❌ Erro ao conectar ou sincronizar o banco:", error);
    }
}

export default sequelize;