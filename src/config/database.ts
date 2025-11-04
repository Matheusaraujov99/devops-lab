import { Sequelize, Options } from "sequelize";

// Variável para armazenar as opções de conexão dinâmicas (com ou sem SSL)
let connectionOptions: Options = {
    // Configurações padrão para o ambiente de desenvolvimento local (sem variáveis de ambiente)
    host: "localhost",
    port: 5433,
    dialect: "postgres",
    logging: false,
};

// Se a variável DB_HOST estiver definida, significa que estamos conectando ao Azure
if (process.env.DB_HOST) {
    console.log(`📡 Conectando ao Azure DB em: ${process.env.DB_HOST}`);
    
    // CRÍTICO: Configuração de SSL para Azure PostgreSQL
    connectionOptions = {
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT || '5432', 10),
        dialect: "postgres",
        logging: false,
        dialectOptions: {
            ssl: {
                require: true, 
                // CRÍTICO: Ignora a necessidade de certificado root local para desenvolvimento.
                rejectUnauthorized: false 
            }
        },
    };
} else {
    console.log("📡 Conectando ao banco de dados local (localhost).");
}


// Inicializa o Sequelize com base nas variáveis de ambiente ou nos valores padrão.
const sequelize = new Sequelize(
    process.env.DB_NAME || "devopsdb",
    process.env.DB_USER || "postgres",
    process.env.DB_PASSWORD || "123456",
    connectionOptions // Usa as opções dinâmicas (com ou sem SSL)
);

/**
 * Função para autenticar a conexão e sincronizar o esquema (criar/atualizar tabelas).
 * Será chamada no server.ts.
 */
export async function connectDB() {
    try {
        await sequelize.authenticate();
        console.log("✅ Conexão com o banco estabelecida com sucesso.");

        // Sincroniza o schema. Isso é o que CRIA as tabelas no Azure.
        // O App Service no Azure fará isso no primeiro boot.
        await sequelize.sync({ alter: true }); 
        console.log("✅ Schema sincronizado (tabelas verificadas/criadas).");

    } catch (error) {
        console.error("❌ Erro ao conectar ou sincronizar o banco:", error);
    }
}

export default sequelize;