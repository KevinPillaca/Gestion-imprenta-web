import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {

  constructor(private router: Router) {}

  cerrarSesion() {
    Swal.fire({
      title: '<span style="font-family:Poppins, sans-serif; color:#000000ff;">¿Cerrar sesión?</span>',
      text: 'Tu sesión actual se cerrará.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      background: '#bffbffff',
      color: '#000000ff',
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {

        // 🧹 Borra los datos de sesión del almacenamiento local
        localStorage.removeItem('token');
        localStorage.removeItem('usuario');

        // ✅ Alerta de confirmación
        Swal.fire({
          title: '<span style="font-family:Poppins, sans-serif; color:#000000ff;">Sesión cerrada</span>',
          text: 'Has cerrado sesión correctamente.',
          icon: 'success',
          timer: 2000,
          showConfirmButton: false,
          background: '#cffafdff'
        });

        // ⏳ Espera a que termine el mensaje antes de redirigir
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 2000);
      }
    });
  }
}
