import { pool } from "../config/db";
import { Cliente } from "../models/cliente.model";

export class ClienteService {

//GUARDAR CLIENTE EN LA BASE DE DATOS
  static async crearCliente(cliente: any) {
  const query = `
    INSERT INTO Cliente 
    (Nombre_Razon, Dni_Ruc, Telefono, Correo, Direccion, Departamento) 
    VALUES (?, ?, ?, ?, ?, ?)
  `;

  const values = [
    cliente.Nombre_Razon,
    cliente.Dni_Ruc,
    cliente.Telefono,
    cliente.Correo,
    cliente.Direccion,
    cliente.Departamento
  ];

  const [result]: any = await pool.query(query, values);

  return {
    cliente_id: result.insertId,
    ...cliente
  };
}
  //TRAER DATOS DEL CLIENTE DE LA BASE DE DATOS
 static async obtenerClientes() {
    const [rows] = await pool.query(
      "SELECT * FROM cliente ORDER BY clienteID DESC"
    );
    return rows;
  }

  //ACTUALIZAR LA TABLA EN LA BASE DE DATOS
  static async actualizarCliente(id: number, cliente: any) {
    const sql = `
      UPDATE cliente 
      SET 
        Nombre_Razon = ?, 
        Dni_Ruc = ?, 
        Telefono = ?, 
        Correo = ?, 
        Direccion = ?, 
        Departamento = ?
      WHERE ClienteID = ?;
    `;

    const values = [
      cliente.Nombre_Razon,
    cliente.Dni_Ruc,
    cliente.Telefono,
    cliente.Correo,
    cliente.Direccion,
    cliente.Departamento,
    id
    ];

    const [result]: any = await pool.query(sql, values);
    return result;
  }

  //ELIMINAR CLIENTE DE LA TABLA Y BASE DE DATOS
  static async eliminarCliente(id: number) {
    const [result]: any = await pool.query(
      "DELETE FROM cliente WHERE ClienteID = ?",
      [id]
    );
    return result;
  }
}

