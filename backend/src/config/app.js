import 'dotenv/config';

import express from "express";
import cors from "cors";

import colecaoRoutes from '../routes/Colecao.routes.js';
import itemRoutes from '../routes/Item.routes.js';
import comentarioRoutes from '../routes/Comentario.routes.js';

const app = express();

const FRONT_URL = "http://localhost:5173";

app.use(express.json());

app.use(
  cors({
    origin: FRONT_URL,
    credentials: true,
  })
);

app.use("/colecao", colecaoRoutes);
app.use("/item", itemRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/comentario", comentarioRoutes);

app.get("/", (req, res) => {
  res.send("API rodando 🚀");
});

export default app;