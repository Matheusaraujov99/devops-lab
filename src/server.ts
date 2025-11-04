import express from "express";
import "dotenv/config";
import cors from "cors";
import sequelize, { connectDB } from "./config/database"; // IMPORTANTE: Importar a função connectDB
import labRoutes from "./routes/labRoutes";
import authRoutes from "./routes/authRoutes";
import setupSwagger from "./swagger";
import * as path from "path";

const app = express();
const PORT = process.env.PORT || 3001; 

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

setupSwagger(app);

app.use("/auth", authRoutes);
app.use("/labs", labRoutes);


// Novo Bloco: Usa a função assíncrona connectDB do arquivo de configuração
async function startServer() {
    try {
        // 1. Tenta conectar e sincronizar o banco de dados (agora com SSL configurado)
        await connectDB(); 

        // 2. Inicia o servidor Express somente após a conexão com o DB
        app.listen(PORT, () => {
            console.log(`🚀 Servidor rodando na porta ${PORT}`);
            console.log("📘 Documentação Swagger disponível em /api-docs (após o deploy)");
        });

    } catch (error) {
        // O erro já é logado dentro do connectDB, mas é bom ter um fallback aqui
        console.error("🔴 Falha crítica ao iniciar o servidor devido a erro no DB.");
    }
}

// Inicia a aplicação
startServer();