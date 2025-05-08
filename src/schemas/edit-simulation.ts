import { z } from "zod";

export const editSimulationSchema = z.object({
  valor_total: z
    .number()
    .min(0, { message: "Valor total não pode ser negativo" })
    .optional(),

  quantidade_parcelas: z
    .number()
    .min(1, { message: "Número de parcelas deve ser maior que 0" })
    .optional(),

  juros_ao_mes: z
    .number()
    .min(0, { message: "Juros ao mês não pode ser negativo" })
    .max(100, { message: "Juros ao mês não pode ser maior que 100%" })
    .optional(),
});
