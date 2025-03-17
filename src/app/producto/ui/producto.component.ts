import { Component, OnInit } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { ProductoService } from '../data-access/producto.service';
import { CommonModule } from '@angular/common';
import { CarritoService } from '../../carrito/data-access/carrito.service';
import { Router } from '@angular/router';
import { lastValueFrom } from 'rxjs';

@Component({
  selector: 'app-producto',
  standalone: true, // <-- Agregar esta línea para módulos independientes
  imports: [CommonModule], // <-- No es necesario aquí si estás usando AppModule
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css'], // <-- Cambié "styleUrl" a "styleUrls"
})

export class ProductoComponent implements OnInit {
  public productos: Producto[] = [];

  constructor(
    private productoService: ProductoService,
    private carritoService: CarritoService,
    private router: Router
  ) {}

  async ngOnInit() {
    this.productos = await lastValueFrom(this.productoService.obtenerProducto()).then((prods) => prods);
  }

  agregarAlCarrito(producto: any) {
    this.carritoService.agregarProducto(producto);
  }

  irAlCarrito() {
    this.router.navigate(['/carrito']);
  }

  irAlInventario() {
    this.router.navigate(['/inventario']);
  }
}