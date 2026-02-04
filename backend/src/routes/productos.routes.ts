import { Router } from "express";
import { createProduct,getProductos, updateProducto, deleteProducto } from "../controllers/productos.controller";
import { upload } from "../middlewares/upload";

const router = Router();

// GET → listar productos
router.get("/", getProductos);

// POST → crear producto con imagen
router.post("/", upload.single("imagen"), createProduct);

// PUT → modificar profucto 
router.put("/:id", updateProducto)

// DELETE → eliminar profucto
router.delete("/:id", deleteProducto); 
export default router;