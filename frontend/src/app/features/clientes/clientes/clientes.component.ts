import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientesService } from '../../../services/clientes.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-clientes',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './clientes.component.html',
  styleUrl: './clientes.component.css'
})
export class ClientesComponent implements OnInit{
  clienteForm!: FormGroup;   // 👈 ESTA ES LA CLAVE

  clientes: any[] = [];
  clienteSeleccionado: any = null;
  clienteEditando: any = null;

 constructor(
  private fb: FormBuilder,
  private clientesService: ClientesService
) {}

  ngOnInit(): void {
  this.clienteForm = this.fb.group({
    Nombre_Razon: ['', Validators.required],
    Dni_Ruc: ['', Validators.required],
    Telefono: ['', Validators.required],
    Correo: ['', [Validators.required, Validators.email]],
    Direccion: ['', Validators.required],
    Departamento: ['', Validators.required]
  });

  this.obtenerClientes();
}
//MOSTRAR CLIENTE EN LA TABLA
obtenerClientes() {
  this.clientesService.getClientes().subscribe({
    next: (res) => {
      this.clientes = res.data;
    },
    error: (err) => {
      console.error("Error al obtener clientes", err);
    }
  });
}


//METODO GUARDAR CLIENTE
guardarCliente() {
  if (this.clienteForm.invalid) {
    this.clienteForm.markAllAsTouched();
    return;
  }

  // 👉 SI ESTAMOS EDITANDO
  if (this.clienteEditando) {
    this.clientesService.actualizarCliente(
      this.clienteEditando.ClienteID,
      this.clienteForm.value
    ).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          title: 'Actualizado',
          text: res.message,
          timer: 2000,
          showConfirmButton: false
        });

        this.clienteForm.reset();
        this.clienteEditando = null;
        this.clienteSeleccionado = null;
        this.obtenerClientes();
      },
      error: () => {
        Swal.fire("Error al actualizar cliente");
      }
    });

    return;
  }

  // 👉 SI ES NUEVO CLIENTE
  this.clientesService.crearCliente(this.clienteForm.value).subscribe({
    next: (res) => {
      Swal.fire({
        background: '#87f9e6ff',
        icon: 'success',
        title: '¡Éxito!',
        text: res.message,
        timer: 2000,
        showConfirmButton: false
      });

      this.clienteForm.reset();
      this.obtenerClientes();
    },
    error: () => {
      alert("❌ Ocurrió un error al guardar el cliente");
    }
  });
}

//MOTODO SELECIONAR FILA
  seleccionarCliente(cliente: any, index: number) {

      // Si haces clic en el mismo elemento → deselecciona
  if (this.clienteSeleccionado?.index === index) {
    this.clienteSeleccionado = null;
    return;
  }

      // Si es otro cliente → selección normal
  this.clienteSeleccionado = { ...cliente, index };
  console.log("Cliente seleccionado:", this.clienteSeleccionado);
}

//METODO EDITAR CLIENTE
  onEditar() {
  if (!this.clienteSeleccionado) {
    Swal.fire("Selecciona un cliente primero");
    return;
  }

  Swal.fire({
    background: '#bafaefff',
    title: 'Editar cliente',
    text: '¿Deseas editar la información de este cliente?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'confirmar',
    cancelButtonText: 'Cancelar',
  }).then(result => {

    if (!result.isConfirmed) return;

    this.clienteEditando = this.clienteSeleccionado;

    this.clienteForm.patchValue({
      Nombre_Razon: this.clienteSeleccionado.Nombre_Razon,
      Dni_Ruc: this.clienteSeleccionado.Dni_Ruc,
      Telefono: this.clienteSeleccionado.Telefono,
      Correo: this.clienteSeleccionado.Correo,
      Direccion: this.clienteSeleccionado.Direccion,
      Departamento: this.clienteSeleccionado.Departamento
    });

    console.log("Editando cliente:", this.clienteEditando);
  });
}

  //METODO ELIMINAR CLIENTE
  onEliminar() {
    console.log("Eliminar presionado");
  }

}
