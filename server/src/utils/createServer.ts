import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import fs from "fs";
import path from "path";
import { CORS_ORIGIN } from "../constants";

function createServer() {
  const app = fastify();

  // enable cors
  app.register(cors, {
    origin: "http://localhost:3000",
    credentials: true,
  });

  // jwt support
  app.register(jwt, {
    secret: {
      private: fs.readFileSync(
        `${(path.join(process.cwd()), "certs")}/private.key`
      ),
      public: fs.readFileSync(
        `${(path.join(process.cwd()), "certs")}/public.key`
      ),
    },
    sign: { algorithm: "RS256" },
  });

  return app;
}

export default createServer;
