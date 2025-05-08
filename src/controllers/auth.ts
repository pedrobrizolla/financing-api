import { hash } from "bcrypt-ts";
import { RequestHandler } from "express";
import { registerSchema } from "../schemas/register";
import { createUser, findUserByEmail } from "../services/user";

export const register: RequestHandler = async (req, res) => {
  const safeData = registerSchema.safeParse(req.body);

  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const hasEmail = await findUserByEmail(safeData.data.email);

  if (hasEmail) {
    res.json({ error: "E-mail já existe em outro usuário!" });
    return;
  }

  const hashPassword = await hash(safeData.data.senha, 10);

  const newUser = await createUser({
    nome: safeData.data.nome,
    sobrenome: safeData.data.sobrenome,
    email: safeData.data.email,
    senha: hashPassword,
  });

  const token = "";

  res.status(201).json({
    token,
    user: {
      nome: newUser.nome,
      sobrenome: newUser.sobrenome,
      email: newUser.email,
    },
  });
};
