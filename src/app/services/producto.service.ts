import { Component, Injectable } from '@angular/core';
import { Producto } from '../models/product';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private productos: Producto[]=[
    new Producto(1,"Guitarra Electrica", 1200, '/assets/supemegaukelele.png'),
    new Producto(2,"Tambor", 800, '/assets/tamborprofesional.png'),
    new Producto(3,"Violin", 600, '/assets/piano.png'),
  ]

  obtenerProductos():Producto[]{return this.productos}
}
