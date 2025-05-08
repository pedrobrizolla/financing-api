import { compare, hash } from "bcrypt-ts";
import { RequestHandler } from "express";
import { loginSchema } from "../schemas/login";
import { registerSchema } from "../schemas/register";
import { createUser, findUserByEmail } from "../services/user";
import { createJWT } from "../utils/jwt";

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

  const token = createJWT(safeData.data.email);

  res.status(201).json({
    token,
    user: {
      nome: newUser.nome,
      sobrenome: newUser.sobrenome,
      email: newUser.email,
    },
  });
};

export const login: RequestHandler = async (req, res) => {
  const safeData = loginSchema.safeParse(req.body);

  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  const user = await findUserByEmail(safeData.data.email);

  if (!user) {
    res.status(401).json({ message: "Credenciais inválidas." });
    return;
  }

  const verifyPass = await compare(safeData.data.senha, user.senha);

  if (!verifyPass) {
    res.status(401).json({ message: "Credenciais inválidas." });
    return;
  }

  const token = createJWT(user.email);

  res.json({
    token,
    user: {
      nome: user.nome,
      sobrenome: user.sobrenome,
      email: user.email,
    },
  });
};
