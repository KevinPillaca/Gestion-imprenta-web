import { Request, Response } from "express";
import { ProductosService } from "../services/productos.service";

export class ProductosController {
    constructor(private productosService: ProductosService) {}

    public getProductos = async (_req: Request, res: Response) => {
        try {
            const productos = await this.productosService.getAll();
            res.json(productos);
        } catch (error) {
            res.status(500).json({ error: "Error al obtener productos" });
        }
    };

    public createProduct = async (req: Request, res: Response) => {
        try {
            const { nombre, descripcion, medida, precio } = req.body;
            const imagen = req.file ? `/uploads/productos/${req.file.filename}` : "";

            const nuevoId = await this.productosService.create({
                nombre,
                descripcion,
                medida,
                precio: Number(precio),
                url_imagen: imagen
            });

            res.status(201).json({ message: "Producto creado", id: nuevoId, imagen });
        } catch (error) {
            res.status(500).json({ error: "Error al guardar producto" });
        }
    };

    public updateProducto = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            const { nombre, descripcion, medida, precio } = req.body;

            await this.productosService.update(id, {
                nombre,
                descripcion,
                medida,
                precio: Number(precio)
            });

            res.json({ message: "Producto actualizado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al actualizar producto" });
        }
    };

    public deleteProducto = async (req: Request, res: Response) => {
        try {
            await this.productosService.delete(req.params.id);
            res.json({ message: "Producto eliminado correctamente" });
        } catch (error) {
            res.status(500).json({ error: "Error al eliminar el producto" });
        }
    };
}