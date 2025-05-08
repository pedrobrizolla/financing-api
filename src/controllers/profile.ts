import { Request, Response } from "express";
import { getProfileSchema } from "../schemas/getprofile";
import { findUserByEmail } from "../services/user";
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
