import cors from "cors";
import express, { urlencoded } from "express";
import helmet from "helmet";
import { mainRouter } from "./routes/main";

const server = express();
server.use(helmet());
server.use(cors());
server.use(urlencoded({ extended: true }));
server.use(express.json());

// routes
server.use(mainRouter);

server.listen(process.env.PORT || 3333, () => {
  console.log(
    `Server is running at ${process.env.BASE_URL} on port ${process.env.PORT}`
  );
});
