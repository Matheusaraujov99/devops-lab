import { DataTypes, Model } from "sequelize";
import sequelize from "../config/database";

class Laboratorio extends Model {
  declare id: number;
  declare nome: string;
  declare capacidade: number;
}

Laboratorio.init(
  {
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
    nome: { type: DataTypes.STRING, allowNull: false },
    capacidade: { type: DataTypes.INTEGER, allowNull: false }
  },
  { sequelize, modelName: "Laboratorio" }
);

export default Laboratorio;