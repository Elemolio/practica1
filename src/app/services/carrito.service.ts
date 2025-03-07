import { Injectable } from '@angular/core';
import { Producto } from '../models/product';
@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito:Producto[]=[];
  agregarProducto(producto:Producto){
    this.carrito.push(producto);
  }
  obtenerCarrito():Producto[]{
    return this.carrito;
  }
  generarXML(): string {
    let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
    xml += '<factura>\n';
    xml += '  <productos>\n';
  
    let subtotal = 0;
    let productosAgrupados: { [id: string]: { nombre: string; precio: number; cantidad: number } } = {};
  
    
    this.carrito.forEach(producto => {
      if (productosAgrupados[producto.id]) {
        productosAgrupados[producto.id].cantidad += 1;
      } else {
        productosAgrupados[producto.id] = {
          nombre: producto.nombre,
          precio: producto.precio,
          cantidad: 1, 
        };
      }
    });
  
    Object.entries(productosAgrupados).forEach(([id, producto]) => {
      const totalProducto = producto.precio * producto.cantidad;
      subtotal += totalProducto; 
  
      xml += `    <producto id="${id}">\n`;
      xml += `      <descripcion>${producto.nombre}</descripcion>\n`;
      xml += `      <cantidad>${producto.cantidad}</cantidad>\n`;
      xml += `      <precioUnitario>${producto.precio.toFixed(2)}</precioUnitario>\n`;
      xml += `      <total>${totalProducto.toFixed(2)}</total>\n`;
      xml += `    </producto>\n`;
    });
  
  
    const tasaIVA = 0.16;
    const iva = subtotal * tasaIVA;
    const totalFactura = subtotal + iva;
  
    xml += '  </productos>\n';
    xml += '  <totales>\n';
    xml += `    <subtotal>${subtotal.toFixed(2)}</subtotal>\n`;
    xml += `    <iva tasa="16%">${iva.toFixed(2)}</iva>\n`;
    xml += `    <total>${totalFactura.toFixed(2)}</total>\n`;
    xml += '  </totales>\n';
    xml += '</factura>';
  
   
    const blob = new Blob([xml], { type: 'application/xml' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'factura.xml';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  
    return xml;
  }
  eliminarDelCarrito(index: number) {
    this.carrito.splice(index, 1);
  }
}
