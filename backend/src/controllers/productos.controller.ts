import { Request, Response } from "express";
import { pool } from "../config/db";

// GUARDAR PRODUCTOS EN LA BD
export const createProduct = async (req: Request, res: Response) => {
    try {
        const { nombre, descripcion, medida, precio } = req.body;

        const precioNumber = Number(precio); // Convertimos a número

        const imagen = req.file ? `/uploads/productos/${req.file.filename}` : null;

        const sql = `
            INSERT INTO productos (nombre, descripcion, medida, precio, url_imagen)
            VALUES (?, ?, ?, ?, ?)
        `;

        const [result] = await pool.execute(sql, [
            nombre,
            descripcion,
            medida,      // ahora string
            precioNumber, // decimal convertido a number
            imagen
        ]);

        return res.status(201).json({
            message: "Producto creado correctamente",
            id: (result as any).insertId,
            imagen
        });

    } catch (error: any) {
        console.error(error);
        return res.status(500).json({ error: "Error al guardar producto" });
    }
};

// MOSTRAR PRODUCTOS EN EL FRONTEND
export const getProductos = async (req: Request, res: Response) => {
    try {
        const [rows] = await pool.execute("SELECT * FROM productos ORDER BY producto_id DESC");
        res.json(rows);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener productos" });
    }
};

// MODIFICAR PRODUCTO EN LA DB
export const updateProducto = async (req: Request, res: Response) => {
    const id = req.params.id;
    const { nombre, descripcion, medida, precio } = req.body;

    const precioNumber = Number(precio);

    try {
        const sql = `
            UPDATE productos 
            SET nombre = ?, descripcion = ?, medida = ?, precio = ?
            WHERE producto_id = ?
        `;

        await pool.execute(sql, [
            nombre,
            descripcion,
            medida,
            precioNumber,
            id
        ]);

        return res.json({ message: "Producto actualizado correctamente" });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Error al actualizar producto" });
    }
};

// ELIMINAR PRODUCTO EN LA DB
export const deleteProducto = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;

        await pool.execute(`DELETE FROM productos WHERE producto_id = ?`, [id]);

        res.json({ message: "Producto eliminado correctamente" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al eliminar el producto" });
    }
};
