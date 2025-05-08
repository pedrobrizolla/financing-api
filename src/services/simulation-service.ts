import { Prisma } from "@prisma/client";
import { SimulationProps } from "../types/simulation-props";
import { prisma } from "../utils/prisma";

export const createFinancing = async (data: Prisma.SimulacaoCreateInput) => {
  return await prisma.simulacao.create({ data });
};

export const updateFinancing = async ({
  id,
  valor_total,
  quantidade_parcelas,
  juros_ao_mes,
  valor_parcela_mensal,
}: SimulationProps) => {
  try {
    const simulacaoAtualizada = await prisma.simulacao.update({
      where: { id },
      data: {
        valor_total,
        quantidade_parcelas,
        juros_ao_mes,
        valor_parcela_mensal,
      },
    });

    return simulacaoAtualizada;
  } catch (error) {
    console.error("Erro ao atualizar simulação:", error);
    return null;
  }
};

export const deleteFinancing = async (id_simulacao: number) => {
  try {
    const simulacaoExcluida = await prisma.simulacao.delete({
      where: { id: id_simulacao },
    });

    return simulacaoExcluida;
  } catch (error) {
    console.error("Erro ao excluir simulação:", error);
    return null;
  }
};
