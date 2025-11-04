import express from "express";
import cors from "cors";
import sequelize from "./config/database";
import labRoutes from "./routes/labRoutes";
import authRoutes from "./routes/authRoutes";
import setupSwagger from "./swagger";
import * as path from "path";

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, '..')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'index.html'));
});

setupSwagger(app);

app.use("/auth", authRoutes);
app.use("/labs", labRoutes);

sequelize.authenticate()
 .then(() => {
console.log("✅ Conectado ao banco PostgreSQL com sucesso!");

return sequelize.sync({ alter: true });
})
.then(() => {
    const PORT = process.env.PORT || 3001; 

 app.listen(PORT, () => {
console.log(`🚀 Servidor rodando na porta ${PORT}`);
 console.log("📘 Documentação Swagger disponível em /api-docs (após o deploy)");
});
})
 .catch((error) => {
console.error("❌ Erro ao conectar ou sincronizar o banco:", error);
 });