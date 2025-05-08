import { Request, RequestHandler, Response } from "express";
import { createSimulationSchema } from "../schemas/create-simulation";
import { editSimulationSchema } from "../schemas/edit-simulation";
import {
  createFinancing,
  deleteFinancing,
  listSimulationsByUser,
  updateFinancing,
} from "../services/simulation-service";
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

export const editSimulation: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { emailToken } = req as ExtendRequest;

  const student = await findUserByEmail(emailToken as string);

  if (!student) {
    res.status(404).json({ error: "Estudante não encontrado!" });
    return;
  }

  const id_simulacao = parseInt(req.params.id);

  const parsed = editSimulationSchema.safeParse(req.body);

  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.format() });
    return;
  }

  const { valor_total, quantidade_parcelas, juros_ao_mes } = parsed.data;

  if (
    valor_total === undefined ||
    quantidade_parcelas === undefined ||
    juros_ao_mes === undefined
  ) {
    res.status(400).json({ error: "Valores inválidos fornecidos!" });
    return;
  }

  const valor_parcela_mensal = calcFinancing(
    valor_total,
    juros_ao_mes,
    quantidade_parcelas
  );

  const simulacao = await updateFinancing({
    id: id_simulacao,
    valor_total,
    quantidade_parcelas,
    juros_ao_mes,
    valor_parcela_mensal,
  });

  if (!simulacao) {
    res.status(404).json({ error: "Simulação não encontrada para edição!" });
    return;
  }

  res.status(200).json(simulacao);
};

export const deleteSimulation: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { emailToken } = req as ExtendRequest;

  const student = await findUserByEmail(emailToken as string);

  if (!student) {
    res.status(404).json({ error: "Estudante não encontrado!" });
    return;
  }

  const id_simulacao = parseInt(req.params.id);

  const simulacao = await deleteFinancing(id_simulacao);

  if (!simulacao) {
    res.status(404).json({ error: "Simulação não encontrada para exclusão!" });
    return;
  }

  res.status(200).json({ message: "Simulação excluída com sucesso!" });
};

export const listSimulations: RequestHandler = async (
  req: Request,
  res: Response
) => {
  const { emailToken } = req as ExtendRequest;

  const student = await findUserByEmail(emailToken as string);

  if (!student) {
    res.status(404).json({ error: "Estudante não encontrado!" });
    return;
  }

  const simulacoes = await listSimulationsByUser(student.id);

  res.status(200).json(simulacoes);
};
