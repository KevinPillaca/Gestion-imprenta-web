import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/productos.model';

@Injectable({
  providedIn: 'root'
})

export class ProductosService {

  private api = 'http://localhost:3000/api/productos';

  constructor(private http: HttpClient) {}
// crear producto
  crearProducto(formData: FormData): Observable<Product> {
    return this.http.post<Product>(this.api, formData);
  }

// mostrar producto
  getProductos() {
  return this.http.get<any[]>(this.api);
}

// actualizar producto
actualizarProducto(id: number, producto: any) {
  return this.http.put(`${this.api}/${id}`, producto);
}

// eliminar producto
eliminarProducto(id: number) {
  return this.http.delete(`${this.api}/${id}`);
}
}

