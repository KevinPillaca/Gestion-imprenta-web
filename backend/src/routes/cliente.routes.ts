import { Router } from "express";
import { crearCliente, getClientes,actualizarCliente,eliminarCliente} from "../controllers/cliente.controller";

const router = Router();

// POST → crear producto
router.post("/", crearCliente);

// GET → listar productos
router.get("/", getClientes);

// PUT → modificar profucto
router.put("/:id", actualizarCliente);

// DELETE → eliminar profucto
router.delete('/:id', eliminarCliente);

export default router;