import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, map, catchError, of } from 'rxjs';
import { Producto } from '../../producto/interfaces/producto';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private productosSubject = new BehaviorSubject<Producto[]>([]);
  productos$ = this.productosSubject.asObservable();
  private xmlUrl = 'productos.xml'; // Ruta correcta al XML

  constructor(private http: HttpClient) {
    this.cargarProductos();
  }

  cargarProductos(): void {
    this.http.get(this.xmlUrl, { responseType: 'text' }).pipe(
      map(xml => this.parseXML(xml)),
      catchError(error => {
        console.error('Error al cargar los productos desde XML:', error);
        return of([]); // Devuelve una lista vacía si hay error
      })
    ).subscribe(productos => {
      this.productosSubject.next(productos);
    });
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

  agregarProducto(producto: Producto): void {
    console.warn('No se puede agregar productos en el cliente. Esto debe hacerse en el servidor/XML.');
  }

  actualizarProducto(producto: Producto): void {
    console.warn('No se puede actualizar productos en el cliente. Esto debe hacerse en el servidor/XML.');
  }

  eliminarProducto(id: number): void {
    console.warn('No se puede eliminar productos en el cliente. Esto debe hacerse en el servidor/XML.');
  }

  descargarInventarioXML(): void {
    const productos = this.productosSubject.value;
    const xmlContent = this.generarXML(productos);
    const blob = new Blob([xmlContent], { type: 'application/xml' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = 'inventario.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  private generarXML(productos: Producto[]): string {
    let xml = `<?xml version="1.0" encoding="UTF-8"?>\n<inventario>\n`;

    productos.forEach(producto => {
      xml += `<producto>
        <id>${producto.id}</id>
        <nombre>${producto.nombre}</nombre>
        <precio>${producto.precio}</precio>
        <cantidad>${producto.cantidad}</cantidad>
        <imagen>${producto.imagen}</imagen>
      </producto>\n`;
    });

    xml += '</inventario>';
    return xml;
  }
}
