import { Injectable, signal, computed } from '@angular/core';
import { Subject } from 'rxjs'; // Importar Subject desde RxJS
import { IndexedDbService } from '../../modules/public/commons/services/indexed-db.service';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  // Señal para manejar los productos en el carrito
  private dressItemsSignal = signal<any[]>([]);

  // Señal computada para el contador de productos
  dressItemCount = computed(() => this.dressItemsSignal().length);

  // Subject para notificar cambios en el carrito
  private cartUpdated = new Subject<void>();
  cartUpdated$ = this.cartUpdated.asObservable(); // Observable público para suscribirse

  constructor(private indexedDbService: IndexedDbService) {
    this.loadCartItems(); // Cargar los productos del carrito al iniciar
  }

  // Cargar los productos del carrito desde IndexedDB
  async loadCartItems() {
    try {
      const productos = await this.indexedDbService.obtenerProductosApartados();
      this.dressItemsSignal.set(productos);
      return productos;
    } catch (error) {
      console.error("Error al cargar los ítems del carrito:", error);
      return [];
    }
  }

  // Método para agregar un producto al carrito
  async addToCart(producto: any) {
    console.log("Intentando agregar producto al carrito:", producto);
    const currentItems = this.dressItemsSignal();
    // Verificar si el producto ya está en el carrito
    const isProductInCart = currentItems.some((item) => item.id === producto.id);
this.loadCartItems()
    if (isProductInCart) {
      console.warn("El producto ya está en el carrito");
    } else {
      // Agregar el producto al carrito
      this.dressItemsSignal.set([...currentItems, producto]);
      console.log("Producto agregado al carrito:", producto);

      // Guardar el producto en IndexedDB
      await this.indexedDbService.guardarProducto(producto);
      console.log("Producto guardado en IndexedDB:", producto);

      // Notificar que el carrito ha cambiado
      this.cartUpdated.next();
      console.log("Notificación de cambio en el carrito enviada");
    }
  }

 // Método para eliminar un producto del carrito
async removeFromCart(id: string) {
  console.log("Intentando eliminar producto del carrito con ID:", id);
  const currentItems = this.dressItemsSignal();
  const updatedItems = currentItems.filter((item) => item.id !== id);

  // Actualizar la señal con los productos restantes
  this.dressItemsSignal.set(updatedItems);
  console.log("Producto eliminado del carrito. Carrito actualizado:", updatedItems);

  // Eliminar el producto de IndexedDB
  await this.indexedDbService.eliminarProducto(id);
  console.log("Producto eliminado de IndexedDB con ID:", id);

  // Notificar que el carrito ha cambiado
  this.cartUpdated.next();
  console.log("Notificación de cambio en el carrito enviada");
}

// Método para cargar los ítems del carrito desde IndexedDB


  // Método para obtener los productos del carrito
  getCartItems() {
    const items = this.dressItemsSignal();
    console.log("Obteniendo productos del carrito:", items);
    return items;
  }

  // Método para inicializar el carrito con datos existentes
  initializeCart(items: any[]) {
    console.log("Inicializando carrito con productos:", items);
    this.dressItemsSignal.set(items);
  }
}