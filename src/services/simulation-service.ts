import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export const createFinancing = async (data: Prisma.SimulacaoCreateInput) => {
  return await prisma.simulacao.create({ data });
};
