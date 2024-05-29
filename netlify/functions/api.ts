import express, { Router } from "express";
import serverless from "serverless-http";

const api = express();

const router = Router();
//===============================================================
//  Rotas a serem planejadas

router.get("/hello", (req, res) => res.send("Hello World!"));

api.use("/api/", router);

// n_rotas . . .
//===============================================================

export const handler = serverless(api);
