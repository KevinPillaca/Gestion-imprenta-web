import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, UrlTree } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  private isTokenValid(token: string | null): boolean {
    if (!token) return false;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const now = Math.floor(Date.now() / 1000);
      return payload.exp && payload.exp > now;
    } catch {
      return false;
    }
  }

  private redirectToLogin(): UrlTree {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    return this.router.parseUrl('/login');
  }

  private checkAuth(): boolean | UrlTree {
    const token = localStorage.getItem('token');

    if (this.isTokenValid(token)) {
      console.log('✅ Token válido, acceso permitido.');
      return true;
    }

    console.warn('⛔ Token ausente o inválido, redirigiendo al login...');
    return this.redirectToLogin();
  }

  canActivate(): boolean | UrlTree {
    return this.checkAuth();
  }

  canActivateChild(): boolean | UrlTree {
    return this.checkAuth();
  }
}
