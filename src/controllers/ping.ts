import { Request, Response } from "express";
import { ExtendRequest } from "../types/extend-request";

export const ping = (req: Request, res: Response) => {
  res.json({ pong: true });
};

export const pingPrivate = (req: ExtendRequest, res: Response) => {
  res.json({ pong: true, email: req.emailToken });
};
