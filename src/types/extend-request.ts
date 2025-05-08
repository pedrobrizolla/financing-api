import { Request } from "express";

export type ExtendRequest = Request & {
  emailToken?: string;
};
