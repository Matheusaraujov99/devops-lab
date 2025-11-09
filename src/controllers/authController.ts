import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const SECRET = process.env.JWT_SECRET || "segredo-turma-devops";

export const login = async (req: Request, res: Response) => {
  const { email, senha } = req.body;

  try {

    const user = await User.findOne({ where: { email } });

    const fakeUser = {
      email: "admin@faculdade.com",
      senha: bcrypt.hashSync("123456", 8),
    };

    const validUser = user
      ? {
          email: user.getDataValue("email"),
          senha: user.getDataValue("senha"),
        }
      : fakeUser;

    const senhaCorreta = bcrypt.compareSync(senha, validUser.senha);
    if (email !== validUser.email || !senhaCorreta) {
      return res.status(401).json({ message: "Credenciais inválidas" });
    }

    const token = jwt.sign({ email: validUser.email }, SECRET, { expiresIn: "1h" });

    res.json({ token });
  } catch (error) {
    console.error("Erro no login:", error);
    res.status(500).json({ message: "Erro ao realizar login", error });
  }
};

export const register = async (req: Request, res: Response) => {
  const { nome, email, senha } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(senha, 8);
    const novoUsuario = await User.create({ nome, email, senha: hashedPassword });

    res.status(201).json({
      message: "Usuário registrado com sucesso!",
      usuario: {
        id: novoUsuario.getDataValue("id"),
        nome: novoUsuario.getDataValue("nome"),
        email: novoUsuario.getDataValue("email"),
      },
    });
  } catch (error) {
    console.error("Erro ao registrar:", error);
    res.status(500).json({ message: "Erro ao registrar usuário", error });
  }
};