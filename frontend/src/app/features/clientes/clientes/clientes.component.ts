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
    nombre_razon: ['', Validators.required],
    ruc_dni: ['', Validators.required],
    telefono: ['', Validators.required],
    correo: ['', [Validators.required, Validators.email]],
    direccion: ['', Validators.required],
    departamento: ['', Validators.required]
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
    this.clienteEditando.cliente_id, // 👈 CAMBIADO: Antes decía ClienteID
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
    error: (err) => {
      console.error("Error al actualizar:", err); // Siempre es bueno ver el error en consola
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
      nombre_razon: this.clienteSeleccionado.nombre_razon,
      ruc_dni: this.clienteSeleccionado.ruc_dni,
      telefono: this.clienteSeleccionado.telefono,
      correo: this.clienteSeleccionado.correo,
      direccion: this.clienteSeleccionado.direccion,
      departamento: this.clienteSeleccionado.departamento
    });

    console.log("Editando cliente:", this.clienteEditando);
  });
}

  //METODO ELIMINAR CLIENTE
 onEliminar() {
  if (!this.clienteSeleccionado) {
    Swal.fire({
      icon: 'info',
      title: 'Atención',
      text: 'Debes seleccionar un cliente de la tabla para eliminarlo'
    });
    return;
  }

  Swal.fire({
    background: '#bafaefff',
    title: '¿Estás seguro?',
    text: `Vas a eliminar a: ${this.clienteSeleccionado.nombre_razon}.`,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
  }).then((result) => {
    if (result.isConfirmed) {
      
      const id = this.clienteSeleccionado.cliente_id;

      // ✅ Usamos el método correcto y tipamos res y err como 'any'
      this.clientesService.eliminarCliente(id).subscribe({
        next: (res: any) => { 
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El cliente ha sido borrado correctamente',
            timer: 2000,
            showConfirmButton: false
          });

          this.clienteSeleccionado = null;
          this.obtenerClientes(); 
        },
        error: (err: any) => {
          console.error("Error al eliminar:", err);
          Swal.fire('Error', 'No se pudo eliminar el cliente', 'error');
        }
      });
    }
  });
}

}
