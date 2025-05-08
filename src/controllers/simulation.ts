import { Request, RequestHandler, Response } from "express";
import { createSimulationSchema } from "../schemas/create-simulation";
import { createFinancing } from "../services/simulation-service";
import { findUserByEmail } from "../services/user";
import { ExtendRequest } from "../types/extend-request";
import { calcFinancing } from "../utils/calc";

export const createSimulation: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { emailToken } = req as ExtendRequest;

  const student = await findUserByEmail(emailToken as string);

  if (!student) {
    res.status(404).json({ error: "Estudante não encontrado!" });
    return;
  }

  const parsed = createSimulationSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  const { valor_total, quantidade_parcelas, juros_ao_mes } = parsed.data;

  const valor_parcela_mensal = calcFinancing(
    valor_total,
    juros_ao_mes,
    quantidade_parcelas
  );

  const simulacao = await createFinancing({
    valor_total,
    quantidade_parcelas,
    juros_ao_mes,
    valor_parcela_mensal,
    estudante: {
      connect: { id: student.id },
    },
  });

  res.status(201).json(simulacao);
};
