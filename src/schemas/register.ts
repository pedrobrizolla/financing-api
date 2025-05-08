import { z } from "zod";

export const registerSchema = z.object({
  nome: z
    .string({ message: "Nome é obrigatório" })
    .min(3, "Seu nome precisa ter no mínimo 3 ou mais caracteres."),
  sobrenome: z
    .string({ message: "Sobrenome é obrigatório" })
    .min(3, "Seu sobrenome precisa ter no mínimo 3 ou mais caracteres"),
  email: z
    .string({ message: "E-mail é obrigatório" })
    .email("E-mail inválido!"),
  senha: z
    .string({ message: "Senha é obrigatória" })
    .min(8, "Sua senha precisa ter no mínimo 8 caracteres."),
});
