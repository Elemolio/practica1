import { Component } from '@angular/core';
import { RouterModule,RouterOutlet } from '@angular/router';
import { ProductoComponent } from './components/producto/producto.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ProductoComponent,RouterModule],
  templateUrl: './app.component.html',
  template:'<router-outlet></router-outlet>',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'mi-proyecto';
}
