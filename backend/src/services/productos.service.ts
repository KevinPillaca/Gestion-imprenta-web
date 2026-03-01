import { pool } from "../config/db";
import { Product } from "../models/productos.model";

export class ProductosService {
    // Listar todos los productos
    async getAll() {
        const [rows] = await pool.execute("SELECT * FROM productos ORDER BY producto_id DESC");
        return rows;
    }

    // Crear un producto
    async create(data: Product) {
        const sql = `
            INSERT INTO productos (nombre, descripcion, medida, precio, url_imagen)
            VALUES (?, ?, ?, ?, ?)
        `;
        const [result] = await pool.execute(sql, [
            data.nombre,
            data.descripcion,
            data.medida,
            data.precio,
            data.url_imagen
        ]);
        return (result as any).insertId;
    }

    // Actualizar producto
    async update(id: string, data: Partial<Product>) {
        const sql = `
            UPDATE productos 
            SET nombre = ?, descripcion = ?, medida = ?, precio = ?
            WHERE producto_id = ?
        `;
        await pool.execute(sql, [
            data.nombre,
            data.descripcion,
            data.medida,
            data.precio,
            id
        ]);
    }

    // Eliminar producto
    async delete(id: string) {
        await pool.execute(`DELETE FROM productos WHERE producto_id = ?`, [id]);
    }
}