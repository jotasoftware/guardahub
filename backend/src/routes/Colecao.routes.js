import { Router } from "express";
import { createColecao, deleteColecao, getAllColecoes, getColecaoById, getColecoesBySearch, updateColecao, addVisualizacao } from "../controllers/ColecaoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createColecao);
router.get("/", authMiddleware, getAllColecoes);
router.get("/search", authMiddleware, getColecoesBySearch);
router.get("/:id", authMiddleware, getColecaoById);
router.put("/:id", authMiddleware, updateColecao);
router.put("/view/:id", authMiddleware, addVisualizacao);
router.delete("/:id", authMiddleware, deleteColecao);


export default router;
