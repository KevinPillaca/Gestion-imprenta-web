import { Router } from "express";
import { ProductosController } from "../controllers/productos.controller";
import { ProductosService } from "../services/productos.service";
import { upload } from "../middlewares/upload";

const router = Router();

// Instanciamos
const productosService = new ProductosService();
const productosController = new ProductosController(productosService);

// GET → listar productos
router.get("/", productosController.getProductos);
// POST → crear producto
router.post("/", upload.single("imagen"), productosController.createProduct);
// PUT → modificar profucto
router.put("/:id", productosController.updateProducto);
// DELETE → eliminar profucto
router.delete("/:id", productosController.deleteProducto);

export default router;