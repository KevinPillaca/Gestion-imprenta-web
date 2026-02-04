import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { SidebarComponent } from '../../sidebar-shared/sidebar/sidebar.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-layout-dashboard',
  standalone: true,
  imports: [RouterOutlet, SidebarComponent],
  templateUrl: './layout-dashboard.component.html',
  styleUrls: ['./layout-dashboard.component.css']
})
export class LayoutDashboardComponent {
  titulo: string = 'Bienvenido'; // 👈 valor por defecto

  constructor(private router: Router) {
    // Detectar cambios en la ruta
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe(() => {
        const url = this.router.url;

        if (url.includes('/dashboard/productos')) {
          this.titulo = 'Productos';
        } else if (url.includes('/dashboard/cotizacion')) {
          this.titulo = 'Cotización';
        } else if (url.includes('/dashboard/clientes')) {
          this.titulo = 'Clientes';
        } else if (url.includes('/dashboard/cobranzas')) {
          this.titulo = 'Cobranzas';
        } else if (url.includes('/dashboard/contabilidad')) {
          this.titulo = 'Contabilidad';
        } else {
          this.titulo = 'Bienvenido';
        }
      });
  }
}
