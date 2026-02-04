import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm: FormGroup;
  cargando = false;
  mensaje = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      this.mensaje = 'Por favor, completa todos los campos.';
      return;
    }

    this.cargando = true;
    this.mensaje = '';

    const { usuario, contrasena } = this.loginForm.value;

    this.authService.login(usuario, contrasena).subscribe({
      next: (response) => {
        console.log('Respuesta del backend:', response);
        this.cargando = false;
        this.mensaje = response.msg;

        // ✅ Guarda los datos de sesión (esto nos servirá para el guard)
        localStorage.setItem('usuario', JSON.stringify(response.user));
        localStorage.setItem('token', response.token);

        // ✅ Redirige al dashboard con una pequeña pausa
        setTimeout(() => {
          this.router.navigate(['/dashboard']);
        }, 500);
      },
      error: (error) => {
        this.cargando = false;
        this.mensaje = error.error.msg || 'Error al conectar con el servidor';
      },
    });
  }
}
  