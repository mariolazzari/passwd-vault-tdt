import fastify from "fastify";
import cors from "@fastify/cors";
import jwt from "@fastify/jwt";
import fs from "fs";
import path from "path";
import { CORS_ORIGIN } from "../constants";
import cookie from "@fastify/cookie";
import { FastifyRequest, FastifyReply } from "fastify";

function createServer() {
  const app = fastify();

  // enable cors
  app.register(cors, {
    origin: CORS_ORIGIN,
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
    sign: {
      algorithm: "RS256",
    },
    cookie: {
      cookieName: "token",
      signed: false,
    },
  });

  // cookie suppoer
  app.register(cookie, {
    parseOptions: {},
  });

  app.decorate(
    "authenticate",
    async (req: FastifyRequest, res: FastifyReply) => {
      try {
        const user = await req.jwtVerify<{ _id: string }>();
        req.user = user;
      } catch (ex) {
        return res.send(ex);
      }
    }
  );

  return app;
}

export default createServer;
