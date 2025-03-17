import { inject, Injectable } from '@angular/core';
import { Producto } from '../interfaces/producto';
import { catchError, map, Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private xmlUrl = 'productos.xml'; // Asegúrate de que el archivo esté en `src/assets/`
  private http = inject(HttpClient);

  obtenerProducto(): Observable<Producto[]> {
    return this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
      map(xml => {
        const productos = this.parseXML(xml);
        localStorage.setItem('productos', JSON.stringify(productos)); // Sobrescribe localStorage con el XML
        return productos;
      }),
      catchError(error => {
        console.error('Error al cargar los productos desde XML:', error);
        return of([]); // Si hay error, devuelve un array vacío
      })
    );
  }

  obtenerProductosDesdeLocalStorage(): Producto[] {
    const productos = localStorage.getItem('productos');
    return productos ? JSON.parse(productos) : [];
  }

  limpiarLocalStorage() {
    localStorage.removeItem('productos'); // Borra todos los productos en localStorage
  }

  private parseXML(xml: string): Producto[] {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(xml, 'text/xml');
    const productos: Producto[] = [];

    Array.from(xmlDoc.getElementsByTagName('producto')).forEach(prod => {
      const id = parseInt(prod.getElementsByTagName('id')[0]?.textContent || '0');

      productos.push({
        id: id,
        nombre: prod.getElementsByTagName('nombre')[0]?.textContent || '',
        precio: parseFloat(prod.getElementsByTagName('precio')[0]?.textContent || '0'),
        cantidad: parseInt(prod.getElementsByTagName('cantidad')[0]?.textContent || '0'),
        imagen: prod.getElementsByTagName('imagen')[0]?.textContent || ''
      });
    });

    return productos;
  }
}