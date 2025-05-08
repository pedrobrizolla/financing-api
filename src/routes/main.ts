import { Router } from "express";
import * as authController from "../controllers/auth";
import * as pingController from "../controllers/ping";
import * as profileController from "../controllers/profile";
import * as simulationController from "../controllers/simulation";
import { verifyJWT } from "../utils/jwt";

export const mainRouter = Router();

mainRouter.get("/api/ping", pingController.ping);
mainRouter.get("/api/private-ping", verifyJWT, pingController.pingPrivate);

mainRouter.post("/api/register", authController.register);
mainRouter.post("/api/login", authController.login);

mainRouter.get("/api/me", verifyJWT, profileController.getProfile);
mainRouter.put("/api/me", verifyJWT, profileController.updateProfile);

mainRouter.get(
  "/api/simulations",
  verifyJWT,
  simulationController.listSimulations
);
mainRouter.post(
  "/api/simulations",
  verifyJWT,
  simulationController.createSimulation
);
mainRouter.put(
  "/api/simulations/:id",
  verifyJWT,
  simulationController.editSimulation
);
mainRouter.delete(
  "/api/simulations/:id",
  verifyJWT,
  simulationController.deleteSimulation
);
