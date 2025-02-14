import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from '../../commons/services/indexed-db.service';
declare const $: any;

export interface DressItem {
  id: string;
  nombre: string;
  precio: number;
  imagenPrincipal: string;
}

@Component({
  selector: 'app-citas-probador',
  templateUrl: './citas-probador.view.html',
  styleUrls: ['./citas-probador.view.scss']
})
export class CitasProbadorView implements OnInit {
  productosApartados: DressItem[] = [];
  selectedStore: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  name: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';
  productosRenta: DressItem[] = [];
  productosVenta: DressItem[] = [];
  constructor(private indexedDbService: IndexedDbService) {}

  async ngOnInit() {
    try {
      const productos = await this.indexedDbService.obtenerProductosApartados();
      this.productosRenta = productos.filter(item => item.categoria === 'renta');
      this.productosVenta = productos.filter(item => item.categoria === 'venta');
      console.log('Productos de renta:', this.productosRenta);
      console.log('Productos de venta:', this.productosVenta);

      this.initializeTabs();
    } catch (error) {
      console.error('Error al obtener productos apartados:', error);
    }
  }

  private initializeTabs() {
    // Asegúrate de que jQuery esté disponible
    if (typeof $ !== 'undefined') {
      $('.menu .item').tab();
    } else {
      console.error('jQuery no está disponible. Asegúrate de que está incluido en tu proyecto.');
    }
  }

  async deleteDressItem(id: string) {
    try {
      this.productosApartados = this.productosApartados.filter(item => item.id !== id);
      await this.indexedDbService.eliminarProducto(id);
    } catch (error) {
      console.error('Error al eliminar el producto:', error);
      // Aquí puedes manejar el error, por ejemplo, mostrando un mensaje al usuario
    }
  }

  // async confirmAppointment() {
  //   // Lógica para confirmar la cita
  //   console.log({
  //     store: this.selectedStore,
  //     date: this.selectedDate,
  //     time: this.selectedTime,
  //     name: this.name,
  //     lastName: this.lastName,
  //     phone: this.phone,
  //     email: this.email
  //   });

  //   // Mover los productos apartados a la colección de "rentados"
  //   for (const item of this.productosApartados) {
  //     await this.indexedDbService.moverProducto(item, 'apartados', 'rentados');
  //   }
  //   this.productosApartados = [];
  // }
}
