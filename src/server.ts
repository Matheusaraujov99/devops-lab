import express from "express";
import "dotenv/config";
import cors from "cors";
import sequelize, { connectDB } from "./config/database";
import labRoutes from "./routes/labRoutes";
import authRoutes from "./routes/authRoutes";
import setupSwagger from "./swagger";
import * as path from "path";

const app = express();
const PORT = process.env.PORT || 3001;
const __dirname = path.resolve();

app.use(express.json());
app.use(cors());

app.use(express.static(path.join(__dirname, "../")));

// Rota principal -> abre o index.html
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../index.html"));
});

setupSwagger(app);
app.use("/auth", authRoutes);
app.use("/labs", labRoutes);

async function startServer() {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
      console.log(`Documentação Swagger: http://localhost:${PORT}/api-docs`);
      console.log(`Front-end disponível em: http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Falha ao iniciar o servidor:", error);
  }
}

startServer();