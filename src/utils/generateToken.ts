import jwt from "jsonwebtoken";

export const generateToken = (userId: number) => {
  const secret = process.env.JWT_SECRET || "segredo-super-seguro";
  return jwt.sign({ id: userId }, secret, { expiresIn: "1h" });
};