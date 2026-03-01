import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

private apiUrl = 'http://localhost:3000/clientes';

constructor(private http: HttpClient) {}

// Crear cliente
crearCliente(data: any): Observable<any> {
  return this.http.post(this.apiUrl, data);
}

// Obtener clientes
getClientes(): Observable<any> {
  return this.http.get(this.apiUrl);
}

// actualizar clientes
actualizarCliente(id: number, data: any): Observable<any> {
  return this.http.put(`${this.apiUrl}/${id}`, data);
}

// ELIMINAR CLIENTE (El que faltaba)
  eliminarCliente(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
