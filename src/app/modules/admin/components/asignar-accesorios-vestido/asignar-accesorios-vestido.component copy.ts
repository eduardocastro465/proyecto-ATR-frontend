import { Component } from '@angular/core';
// import { CdkDragDrop } from '@angular/cdk/drag-drop';

interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  inventoryStatus: string;
}

@Component({
  selector: 'app-asignar-accesorios-vestido',
  templateUrl: './asignar-accesorios-vestido.component.html',
  styleUrls: ['./asignar-accesorios-vestido.component.scss']
})
export class AsignarAccesoriosVestidoComponent {
  availableProducts: Product[] = [
    { id: 1, name: 'Producto A', category: 'Categoría 1', price: 10.99, image: 'product-a.jpg', inventoryStatus: 'INSTOCK' },
    { id: 2, name: 'Producto B', category: 'Categoría 2', price: 15.99, image: 'product-b.jpg', inventoryStatus: 'OUTOFSTOCK' },
    { id: 3, name: 'Producto C', category: 'Categoría 1', price: 20.00, image: 'product-c.jpg', inventoryStatus: 'INSTOCK' }
  ];

  selectedProducts: Product[] = [];

  dragStart(product: Product): void {
    console.log('Dragging:', product.name);
  }

  dragEnd(): void {
    console.log('Drag ended');
  }

  drop(event: <Product[]>): void {
    const product = event.dragData as Product; // Asegúrate de que dragData sea del tipo Product
    this.selectedProducts.push(product);
    this.availableProducts = this.availableProducts.filter(p => p.id !== product.id);
  }

  getSeverity(status: string): string {
    switch (status) {
      case 'INSTOCK':
        return 'success';
      case 'OUTOFSTOCK':
        return 'danger';
      default:
        return '';
    }
  }
}
