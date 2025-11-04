import { Request, Response } from "express";
import Lab from "../models/laboratorio";

// ✅ Listar todos os laboratórios
export const getLabs = async (req: Request, res: Response) => {
  try {
    const labs = await Lab.findAll();
    res.status(200).json(labs);
  } catch (error) {
    res.status(500).json({ message: "Erro ao listar laboratórios", error });
  }
};

// ✅ Criar novo laboratório
export const createLab = async (req: Request, res: Response) => {
  try {
    const { nome, capacidade, localizacao } = req.body;
    const novoLab = await Lab.create({ nome, capacidade, localizacao });
    res.status(201).json(novoLab);
  } catch (error) {
    res.status(500).json({ message: "Erro ao criar laboratório", error });
  }
};

// ✅ Buscar laboratório por ID
export const getLabById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lab = await Lab.findByPk(id);
    if (!lab) return res.status(404).json({ message: "Laboratório não encontrado" });
    res.status(200).json(lab);
  } catch (error) {
    res.status(500).json({ message: "Erro ao buscar laboratório", error });
  }
};

// ✅ Atualizar laboratório
export const updateLab = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { nome, capacidade, localizacao } = req.body;
    const lab = await Lab.findByPk(id);

    if (!lab) return res.status(404).json({ message: "Laboratório não encontrado" });

    await lab.update({ nome, capacidade, localizacao });
    res.status(200).json(lab);
  } catch (error) {
    res.status(500).json({ message: "Erro ao atualizar laboratório", error });
  }
};

// ✅ Deletar laboratório
export const deleteLab = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const lab = await Lab.findByPk(id);
    if (!lab) return res.status(404).json({ message: "Laboratório não encontrado" });

    await lab.destroy();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: "Erro ao deletar laboratório", error });
  }
};