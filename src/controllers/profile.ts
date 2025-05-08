import { Request, Response } from "express";
import { getProfileSchema } from "../schemas/get-profile";
import { updateProfileSchema } from "../schemas/update-profile";
import { findUserByEmail, updateUser } from "../services/user";
import { ExtendRequest } from "../types/extend-request";

export const getProfile = async (req: Request, res: Response) => {
  const { emailToken } = req as ExtendRequest;

  if (!emailToken) {
    res.status(401).json({ message: "Unauthorized" });
    return;
  }

  const user = await findUserByEmail(emailToken);

  if (!user) {
    res.status(404).json({ message: "User not found" });
    return;
  }

  const safeUser = getProfileSchema.parse(user);

  res.json(safeUser);
};

export const updateProfile = async (req: ExtendRequest, res: Response) => {
  const safeData = updateProfileSchema.safeParse(req.body);

  if (!safeData.success) {
    res.json({ error: safeData.error.flatten().fieldErrors });
    return;
  }

  await updateUser(req.emailToken as string, safeData.data);

  res.status(200).json({ message: "Dados atualizados com sucesso!" });
};
