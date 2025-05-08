import jwt from "jsonwebtoken";

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
