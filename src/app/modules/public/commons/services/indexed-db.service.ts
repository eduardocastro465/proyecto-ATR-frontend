import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db!: IDBPDatabase<any>;

  constructor() {
    if (typeof window !== 'undefined') {
      this.initializeDB();
    }
  }

  private async initializeDB(): Promise<void> {
    if (!this.db && typeof window !== 'undefined') {
      try {
        this.db = await openDB('mi-tienda', 1, {
          upgrade(db) {
            if (!db.objectStoreNames.contains('apartados')) {
              db.createObjectStore('apartados', { keyPath: 'id' });
            }
          },
        });
        console.log('IndexedDB initialized successfully');
      } catch {
        console.log('Error initializing IndexedDB');
      }
    }
  }

  async guardarProducto(producto: any) {
    if (!this.db) await this.initializeDB();
    if (!this.db) return;

    try {
      console.log('Saving producto:', producto);
      await this.db.put('apartados', producto);
      console.log('Producto saved successfully');
    } catch {
      console.log('Could not save producto');
    }
  }

  async obtenerProductosApartados() {
    if (!this.db) await this.initializeDB();
    if (!this.db) return [];

    try {
      return await this.db.getAll('apartados');
    } catch {
      console.log('Could not retrieve productos apartados');
      return [];
    }
  }

  async eliminarProducto(productoId: any) {
    if (!this.db) await this.initializeDB();
    if (!this.db) return;

    try {
      console.log('Deleting producto:', productoId);
      await this.db.delete('apartados', productoId);
      console.log('Producto deleted successfully');
    } catch {
      console.log('Could not delete producto');
    }
  }
}
