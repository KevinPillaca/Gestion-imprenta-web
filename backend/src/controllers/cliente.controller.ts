import { Request, Response } from "express";
import { ClienteService } from "../services/cliente.service";

export class ClienteController {
  constructor(private clienteService: ClienteService) {}

  public getClientes = async (_req: Request, res: Response) => {
    try {
      const clientes = await this.clienteService.obtenerClientes();
      res.json({ message: "Lista obtenida", data: clientes });
    } catch (error) {
      res.status(500).json({ message: "Error al obtener clientes" });
    }
  };

  public crearCliente = async (req: Request, res: Response) => {
    try {
      const nuevo = await this.clienteService.crearCliente(req.body);
      res.status(201).json({ message: "Cliente creado", data: nuevo });
    } catch (error) {
      res.status(500).json({ message: "Error al crear cliente" });
    }
  };

  public actualizarCliente = async (req: Request, res: Response) => {
    try {
      const id = Number(req.params.id);
      const result = await this.clienteService.actualizarCliente(id, req.body);

      if (result.affectedRows === 0) return res.status(404).json({ message: "No encontrado" });

      res.json({ message: "Actualizado", data: { id, ...req.body } });
    } catch (error) {
      res.status(500).json({ message: "Error al actualizar" });
    }
  };

  public eliminarCliente = async (req: Request, res: Response) => {
    try {
      const resultado = await this.clienteService.eliminarCliente(Number(req.params.id));
      if (resultado.affectedRows === 0) return res.status(404).json({ message: "No encontrado" });

      res.json({ message: "Eliminado correctamente" });
    } catch (error) {
      res.status(500).json({ message: "Error al eliminar" });
    }
  };
}