import { Component, OnInit } from '@angular/core';
import { IndexedDbService } from '../../commons/services/indexed-db.service';

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
  dressItems: DressItem[] = [];
  selectedStore: string = '';
  selectedDate: string = '';
  selectedTime: string = '';
  name: string = '';
  lastName: string = '';
  phone: string = '';
  email: string = '';

  constructor(private indexedDbService: IndexedDbService) {}

async ngOnInit() {
  try {
    const productos = await this.indexedDbService.obtenerProductosApartados();
    this.dressItems = Array.isArray(productos) ? productos : [productos];
    console.log(this.dressItems);
  } catch (error) {
    console.error('Error al obtener productos apartados:', error);
  }
}


  async deleteDressItem(id: string) {
    try {
      this.dressItems = this.dressItems.filter(item => item.id !== id);
      // await this.indexedDbService.eliminarProducto('apartados', id);
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
  //   for (const item of this.dressItems) {
  //     await this.indexedDbService.moverProducto(item, 'apartados', 'rentados');
  //   }
  //   this.dressItems = [];
  // }
}
