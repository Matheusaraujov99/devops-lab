import { Router, Request, Response, NextFunction } from "express";
import {
  getLabs,
  createLab,
  getLabById,
  updateLab,
  deleteLab
} from "../controllers/labController";
import jwt from "jsonwebtoken";

const router = Router();
const SECRET = "segredo-turma-devops";

// ✅ Middleware para verificar o token JWT
function verificarToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers["authorization"];
  if (!authHeader) return res.status(403).json({ message: "Token ausente" });

  const token = authHeader.split(" ")[1];
  if (!token) return res.status(403).json({ message: "Token ausente no cabeçalho" });

  try {
    jwt.verify(token, SECRET);
    next();
  } catch (error) {
    return res.status(401).json({ message: "Token inválido" });
  }
}

// ✅ Rotas protegidas
router.get("/", verificarToken, getLabs);
router.post("/", verificarToken, createLab);
router.get("/:id", verificarToken, getLabById);
router.put("/:id", verificarToken, updateLab);
router.delete("/:id", verificarToken, deleteLab);

export default router;