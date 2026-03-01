import { pool } from "../config/db";
import { Cliente } from "../models/cliente.model";

export class ClienteService {
  // GET - Traer clientes
  async obtenerClientes() {
    // Cambiado: cliente_id en minúscula
    const [rows] = await pool.query("SELECT * FROM cliente ORDER BY cliente_id DESC");
    return rows;
  }

  // POST - Crear cliente
  async crearCliente(cliente: Cliente) {
    const query = `
      INSERT INTO cliente 
      (nombre_razon, ruc_dni, telefono, correo, direccion, departamento) 
      VALUES (?, ?, ?, ?, ?, ?)
    `;

    const values = [
      cliente.nombre_razon,
      cliente.ruc_dni,
      cliente.telefono,
      cliente.correo,
      cliente.direccion,
      cliente.departamento
    ];

    const [result]: any = await pool.query(query, values);
    return { cliente_id: result.insertId, ...cliente };
  }

  // PUT - Actualizar cliente
  async actualizarCliente(id: number, cliente: Partial<Cliente>) {
    const sql = `
      UPDATE cliente 
      SET nombre_razon = ?, ruc_dni = ?, telefono = ?, correo = ?, direccion = ?, departamento = ?
      WHERE cliente_id = ?;
    `;

    const values = [
      cliente.nombre_razon,
      cliente.ruc_dni,
      cliente.telefono,
      cliente.correo,
      cliente.direccion,
      cliente.departamento,
      id
    ];

    const [result]: any = await pool.query(sql, values);
    return result;
  }

  // DELETE - Eliminar cliente
  async eliminarCliente(id: number) {
    // Cambiado: cliente_id en minúscula
    const [result]: any = await pool.query("DELETE FROM cliente WHERE cliente_id = ?", [id]);
    return result;
  }
  
}