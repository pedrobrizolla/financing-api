import { z } from "zod";

export const getProfileSchema = z.object({
  nome: z.string(),
  sobrenome: z.string(),
  email: z.string().email(),
});
