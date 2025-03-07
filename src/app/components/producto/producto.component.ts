import { Component,OnInit, ViewEncapsulation } from '@angular/core';
import { Producto } from '../../models/product';
import { ProductoService } from '../../services/producto.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CarritoService } from '../../services/carrito.service';
import './producto.component.css'

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  imports:[CommonModule],
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./producto.component.css'],
})

export class ProductoComponent implements OnInit {
  productos:Producto[]=[];
  constructor(
    private productoService:ProductoService,
    private carritoService:CarritoService,
    private router:Router
  ){}
  ngOnInit(): void {
    this.productos=this.productoService.obtenerProductos();
  }
  agregarACarrito(producto:any){
    this.carritoService.agregarProducto(producto);
  }
  irAlCarrito(){
    this.router.navigate(['/carrito']);
  }
}

