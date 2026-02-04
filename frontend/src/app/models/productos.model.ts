export interface Product {
  producto_id?: number;
  nombre: string;
  descripcion: string;
  medida: string;
  precio: number;
  url_imagen?: string; // opcional porque se genera después
}