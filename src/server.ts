import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import labRoutes from "./routes/labRoutes";
import authRoutes from "./routes/authRoutes";
import setupSwagger from "./swagger";

const app = express();

// Configurações globais
app.use(express.json());
app.use(cors());

// 🧩 Swagger precisa ser configurado ANTES das rotas
setupSwagger(app);

// Rotas principais
app.use("/auth", authRoutes);
app.use("/labs", labRoutes);

// Testa a conexão com o banco antes de sincronizar
sequelize.authenticate()
  .then(() => {
    console.log("✅ Conectado ao banco PostgreSQL com sucesso!");

    // Sincroniza o banco e inicia o servidor
    return sequelize.sync({ alter: true });
  })
  .then(() => {
    app.listen(3001, () => {
      console.log("🚀 Servidor rodando em http://localhost:3001");
      console.log("📘 Documentação Swagger disponível em http://localhost:3001/api-docs");
    });
  })
  .catch((error) => {
    console.error("❌ Erro ao conectar ou sincronizar o banco:", error);
  });