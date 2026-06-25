import { Router } from "express";
import { createComentario, deleteComentario, getAllComentarios } from "../controllers/ComentarioController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = Router();

router.post("/", authMiddleware, createComentario);
router.get("/", authMiddleware, getAllComentarios);
router.delete("/:id", authMiddleware, deleteComentario);


export default router;
