import { Prisma } from "@prisma/client";
import { prisma } from "../utils/prisma";

export const findUserByEmail = async (email: string) => {
  const user = await prisma.estudante.findFirst({
    where: { email },
  });

  return user;
};

export const createUser = async (data: Prisma.EstudanteCreateInput) => {
  const newUser = await prisma.estudante.create({ data });

  return newUser;
};

export const updateUser = async (
  email: string,
  data: Prisma.EstudanteUpdateInput
) => {
  const updatedUser = await prisma.estudante.update({
    where: { email },
    data,
  });

  return updatedUser;
};
