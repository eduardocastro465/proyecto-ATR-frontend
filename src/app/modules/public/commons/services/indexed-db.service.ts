import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class IndexedDbService {
  private db: IDBDatabase | null = null;

  constructor() {
    this.initializeDB();
  }

  // Inicializar la base de datos
  private async initializeDB() {
    const request = indexedDB.open('MiBaseDeDatos', 1);

    request.onupgradeneeded = (event: IDBVersionChangeEvent) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains('apartados')) {
        db.createObjectStore('apartados', { keyPath: 'id' });
      }
    };

    request.onsuccess = (event: Event) => {
      this.db = (event.target as IDBOpenDBRequest).result;
    };

    request.onerror = (event: Event) => {
      console.error("Error al abrir la base de datos:", (event.target as IDBOpenDBRequest).error);
    };
  }

  // Guardar un producto en IndexedDB
  async guardarProducto(producto: any) {
    if (!this.db) await this.initializeDB();
    if (!this.db) return;

    const transaction = this.db.transaction('apartados', 'readwrite');
    const store = transaction.objectStore('apartados');
    store.put(producto);
  }

  // Eliminar un producto de IndexedDB
  async eliminarProducto(id: string) {
    if (!this.db) await this.initializeDB();
    if (!this.db) return;

    const transaction = this.db.transaction('apartados', 'readwrite');
    const store = transaction.objectStore('apartados');
    store.delete(id);
  }

  // Obtener todos los productos de IndexedDB
  async obtenerProductosApartados(): Promise<any[]> {
    if (!this.db) await this.initializeDB();
    if (!this.db) return [];

    return new Promise((resolve, reject) => {
      const transaction = this.db!.transaction('apartados', 'readonly');
      const store = transaction.objectStore('apartados');
      const request = store.getAll();

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        reject(request.error);
      };
    });
  }
}