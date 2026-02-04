import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalAgregarProductoComponent } from './modal-agregar-producto/modal-agregar-producto.component';
import { ModalDetalleProductoComponent } from './modal-detalle-producto/modal-detalle-producto.component';
import { ProductosService } from '../../../services/productos.service';

@Component({
  selector: 'app-producto',
  imports: [CommonModule, ModalAgregarProductoComponent, ModalDetalleProductoComponent],
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.css'
})
export class ProductoComponent implements OnInit {

  productos: any[] = [];
  mostrarModalAgregar = false;
  mostrarModalDetalle = false;
  productoSeleccionado: any = null;

  constructor(private productosService: ProductosService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  cargarProductos() {
    this.productosService.getProductos().subscribe({
      next: (data) => {
        this.productos = data;
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      }
    });
  }

  abrirModalAgregar() {
    this.mostrarModalAgregar = true;
  }

  cerrarModalAgregar() {
    this.mostrarModalAgregar = false;
    this.cargarProductos(); // Recargar lista después de guardar
  }

  abrirModalDetalle(producto: any) {
    this.productoSeleccionado = producto;
    this.mostrarModalDetalle = true;
  }

  cerrarModalDetalle() {
    this.mostrarModalDetalle = false;
  }

  onProductoEliminado(id: number) {
  this.productos = this.productos.filter(p => p.producto_id !== id);
  }
}