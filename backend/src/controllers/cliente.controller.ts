import { Request, Response } from "express";
import { ClienteService } from "../services/cliente.service";

//CREAR CLIENTE (POST)
export const crearCliente = async (req: Request, res: Response) => {
  try {
    const nuevoCliente = await ClienteService.crearCliente(req.body);
    return res.status(201).json({
      message: "Cliente creado correctamente",
      data: nuevoCliente
    });
  } catch (error: any) {
    console.error("Error al crear cliente:", error);
    return res.status(500).json({
      message: "Error al crear cliente"
    });
  }
};

//MOSTRAR CLIENTE (GET)
export const getClientes = async (req: Request, res: Response) => {
  try {
    const clientes = await ClienteService.obtenerClientes();

    res.json({
      message: "Lista de clientes obtenida correctamente",
      data: clientes
    });
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      message: "Error al obtener los clientes"
    });
  }
};

//ACTUALIZAR CLIENTE (PUT)
export const actualizarCliente = async (req: Request, res: Response) => {
  try {
    const id = Number(req.params.id);
    const data = req.body;

    if (!id) {
      return res.status(400).json({ message: "ID inválido" });
    }

    const result = await ClienteService.actualizarCliente(id, data);

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Cliente no encontrado" });
    }

    res.json({
      message: "Cliente actualizado correctamente",
      data: { cliente_id: id, ...data }
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al actualizar el cliente" });
  }
};

//ELIMINAR CLIENTE (DELETE)
export const eliminarCliente = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const resultado = await ClienteService.eliminarCliente(Number(id));

    if (resultado.affectedRows === 0) {
      return res.status(404).json({
        message: "Cliente no encontrado"
      });
    }

    return res.json({
      message: "Cliente eliminado correctamente"
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Error al eliminar el cliente"
    });
  }
};