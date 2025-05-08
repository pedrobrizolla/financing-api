import { z } from "zod";

export const updateProfileSchema = z.object({
  nome: z
    .string({ message: "Nome é obrigatório" })
    .min(3, "Seu nome precisa ter no mínimo 3 ou mais caracteres.")
    .optional(),
  sobrenome: z
    .string({ message: "Sobrenome é obrigatório" })
    .min(3, "Seu sobrenome precisa ter no mínimo 3 ou mais caracteres")
    .optional(),
  email: z
    .string({ message: "E-mail é obrigatório" })
    .email("E-mail inválido!")
    .optional(),
});
