import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { LayoutDashboardComponent } from './layout-dashboard/layout-dashboard/layout-dashboard.component';
import { ProductoComponent } from './features/producto/producto/producto.component';
import { CotizacionComponent } from './features/cotizacion/cotizacion/cotizacion.component';
import { ClientesComponent } from './features/clientes/clientes/clientes.component';
import { CobranzasComponent } from './features/cobranzas/cobranzas/cobranzas.component';
import { ContabilidadComponent } from './features/contabilidad/contabilidad/contabilidad.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: LayoutDashboardComponent,
    canActivate: [AuthGuard],
    canActivateChild: [AuthGuard],
    children: [
      { path: 'productos', component: ProductoComponent },
      { path: 'cotizacion', component: CotizacionComponent },
      { path: 'clientes', component: ClientesComponent },
      { path: 'cobranzas', component: CobranzasComponent },
      { path: 'contabilidad', component: ContabilidadComponent },
    ],
  },
  { path: '**', redirectTo: 'login' },
];
