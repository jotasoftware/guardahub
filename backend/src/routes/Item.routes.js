import { Router } from "express";
import { createItem, deleteItem, getAllItens, updateItem } from "../controllers/ItemController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

import upload from "../config/multer.js";

const router = Router();

router.post("/", authMiddleware, upload.single("file"), createItem);
router.get("/", authMiddleware, getAllItens);
router.put("/:id", authMiddleware, upload.single("file"), updateItem);
router.delete("/:id", authMiddleware, deleteItem);

export default router;
