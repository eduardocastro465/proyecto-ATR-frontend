import { Injectable } from '@angular/core';
import { openDB, IDBPDatabase } from 'idb';

@Injectable({
  providedIn: 'root'
})
export class IndexedDbService {
  private db!: IDBPDatabase<any>;

  constructor() {
    this.initializeDB();
  }

  private async initializeDB(): Promise<void> {
    if (this.db) {
      return;
    }

    this.db = await openDB('mi-tienda', 1, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('apartados')) {
          db.createObjectStore('apartados', { keyPath: 'id' });
        }
      },
    });
  }

  async guardarProducto(producto: any) {
    try {
      console.log('Producto to save:', producto);
      const result = await this.db.put('apartados', producto);
      console.log('Producto saved successfully:', result);
      return result;
    } catch (error) {
      console.error('Error saving producto:', error);
      throw error;
    }
  }

  async obtenerProductosApartados() {
    try {
      if (!this.db) {
        await this.initializeDB();
      }
      return await this.db.getAll('apartados');
    } catch (error) {
      console.error('Error getting apartados:', error);
      throw error;
    }
  }

  // Add more methods as needed for handling rented products
}
