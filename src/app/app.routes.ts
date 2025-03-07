import { Routes } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';
import { CarritoComponent } from './carrito/carrito.component';

export const routes: Routes = [
  { path: '', component: ProductoComponent },
  { path: 'carrito', component: CarritoComponent }
];