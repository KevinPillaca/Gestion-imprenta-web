import { Component, EventEmitter, Output } from '@angular/core';
import { ProductosService } from '../../../../services/productos.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-agregar-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-agregar-producto.component.html',
  styleUrl: './modal-agregar-producto.component.css'
})
export class ModalAgregarProductoComponent {

  @Output() cerrar = new EventEmitter<void>();

  nombre: string = '';
  descripcion: string = '';
  medida: string = '';
  precio: number | null = null;
  imagenFile: File | null = null;

  constructor(private productoService: ProductosService) {}

  cerrarModal() {
    this.cerrar.emit();
  }

  onFileSelected(event: any) {
    this.imagenFile = event.target.files[0];
  }

  guardar() {
    if (!this.nombre || !this.descripcion || !this.medida || !this.precio || !this.imagenFile) {
      //alerta sweetalert2
      Swal.fire({
        icon: 'warning',
        title: 'Campos Incompletos',
        text: 'Todos los campos son obligatorios.',
        background: '#73f9e3ff',
        iconColor: '#f46b6bff',
        confirmButtonColor: '#45B653',
        customClass: {
          title: 'swal-title',
          htmlContainer: 'swal-text',
          confirmButton: 'swal-button'
        }
      });
      return;
    }

    const formData = new FormData();
    formData.append("nombre", this.nombre);
    formData.append("descripcion", this.descripcion);
    formData.append("medida", this.medida);
    formData.append("precio", String(this.precio));
    formData.append("imagen", this.imagenFile);

    this.productoService.crearProducto(formData).subscribe({
      next: (res: any) => {
        //alerta sweetalert2
        Swal.fire({
          icon: 'success',
          title: 'Producto registrado',
          text: 'El producto se guardó correctamente.',
          background: '#73f9e3ff',
          timer: 2500,
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-text',   
        },
          showConfirmButton: false
        });
         this.cerrarModal();
      },
      error: (err: any) => {
        alert("Error al guardar el producto");
        console.error(err);
      }
    });
  }
}

