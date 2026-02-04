import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductosService } from '../../../../services/productos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-detalle-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-detalle-producto.component.html',
  styleUrls: ['./modal-detalle-producto.component.css']
})
export class ModalDetalleProductoComponent {
  @Input() producto: any = null; // Recibe el producto seleccionado
  @Output() cerrar = new EventEmitter<void>();
  @Output() eliminado = new EventEmitter<number>();
  
  // control de edición
  modoEdicion: boolean = false;

  constructor(private productosService: ProductosService) {}

  cerrarModal() {
    this.cerrar.emit();
  }

   //Cuando abres el modal desde fuera, por defecto NO se edita
  ngOnChanges() {
    this.modoEdicion = false;
  }

  modificar() {
    this.modoEdicion = true;
  }

  eliminar() {
    //alerta sweetalert2
    Swal.fire({
      title: '¿Eliminar producto?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      background: '#73f9e3ff',
      color: '#000000ff',
      iconColor: '#f46b6bff',
      confirmButtonColor: 'rgba(244, 6, 6, 1)',
      cancelButtonColor: '#3085d6',
      customClass: {
        title: 'swal-title',
        htmlContainer: 'swal-text',
      }
    }).then((result) => {
      
    if (result.isConfirmed) {

      this.productosService.eliminarProducto(this.producto.producto_id).subscribe({
        next: () => {
          //alerta sweetalert2
          Swal.fire({
            icon: 'success',
            title: 'Eliminado',
            text: 'El producto ha sido eliminado correctamente.',
            background: '#73f9e3ff',
            color: '#000000ff',
            iconColor: '#45B653',
            timer: 2000,
            showConfirmButton: false,
            customClass: {
              title: 'swal-title',
              htmlContainer: 'swal-text',
            }
          });

          this.eliminado.emit(this.producto.producto_id);
          this.cerrar.emit();
        },
        error: (err) => console.error(err)
      });

    }
  });
}

  guardar() {
    this.productosService.actualizarProducto(this.producto.producto_id, this.producto)
      .subscribe({
        next: () => {
          //alerta sweetalert2
          Swal.fire({
          icon: 'success',
          title: 'Producto actualizado',
          text: 'Los cambios se guardaron correctamente.',
          background: '#73f9e3ff',
          color: '#000000ff',
          iconColor: '#45B653',
          timer: 2000,
          showConfirmButton: false,
          customClass: {
            title: 'swal-title',
            htmlContainer: 'swal-text'
            }
          });
          this.modoEdicion = false;
        },
        error: (err: any) => console.error(err)
      });
  }
}