import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string({ required_error: "E-mail é obrigatório" })
    .nonempty("E-mail é obrigatório")
    .email("Formato de e-mail inválido"),
  senha: z
    .string({ required_error: "Senha é obrigatória" })
    .nonempty("Senha é obrigatória")
    .min(8, "A senha deve ter no mínimo 8 caracteres"),
});
