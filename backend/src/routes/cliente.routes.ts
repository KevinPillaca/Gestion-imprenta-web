import { Router } from "express";
import { ClienteController } from "../controllers/cliente.controller";
import { ClienteService } from "../services/cliente.service";

const router = Router();

const service = new ClienteService();
const controller = new ClienteController(service);

// POST → crear producto
router.post("/", controller.crearCliente);

// GET → listar productos
router.get("/", controller.getClientes);

// PUT → modificar profucto
router.put("/:id", controller.actualizarCliente);

// DELETE → eliminar profucto
router.delete("/:id", controller.eliminarCliente);

export default router;