import { Router } from "express";
import * as authController from "../controllers/auth";
import * as pingController from "../controllers/ping";

export const mainRouter = Router();

mainRouter.get("/api/ping", pingController.ping);
// mainRouter.get("/privateping");

mainRouter.post("/api/register", authController.register);
// mainRouter.post("/api/login");

// mainRouter.get("/api/me");
// mainRouter.put("/api/me");

// mainRouter.get("/api/simulations");
// mainRouter.post("/api/simulations");
