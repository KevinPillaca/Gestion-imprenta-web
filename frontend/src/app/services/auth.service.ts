import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(usuario: string, contrasena: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { usuario, contrasena });
  }

  // Limpia localStorage y redirige al login
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    // cualquier otra limpieza:
    // localStorage.clear(); // opcional si quieres limpiar todo

    // redirige al login
    this.router.navigate(['/login']);
  }
}
