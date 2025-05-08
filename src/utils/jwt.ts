import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { findUserByEmail } from "../services/user";
import { ExtendRequest } from "../types/extend-request";

enum JWTExpiry {
  ONE_MINUTE = "1m",
  FIVE_MINUTES = "5m",
  FIFTEEN_MINUTES = "15m",
  ONE_HOUR = "1h",
  ONE_DAY = "1d",
}

export const createJWT = (email: string): string => {
  const expiresIn =
    (process.env.JWT_EXPIRES_IN as JWTExpiry) || JWTExpiry.FIVE_MINUTES;

  return jwt.sign({ email }, process.env.JWT_SECRET as string, {
    expiresIn,
  });
};

export const verifyJWT = (
  req: ExtendRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    res.status(401).json({ message: "Não autorizado!" });
    return;
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(
    token,
    process.env.JWT_SECRET as string,
    async (err, decoded: any) => {
      if (err) {
        res.status(401).json({ message: "Não autorizado!" });
        return;
      }

      const user = await findUserByEmail(decoded.email);
      if (!user) {
        res.status(401).json({ message: "Não autorizado!" });
        return;
      }
      req.emailToken = user.email;

      next();
    }
  );
};
