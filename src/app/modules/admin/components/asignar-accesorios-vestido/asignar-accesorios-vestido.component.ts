import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';
import { HttpClient } from '@angular/common/http';
import { MessageService } from 'primeng/api';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-asignar-accesorios-vestido',
  templateUrl: './asignar-accesorios-vestido.component.html',
  styleUrls: ['./asignar-accesorios-vestido.component.scss'],
  providers: [MessageService],
})

export class AsignarAccesoriosVestidoComponent {
  title = 'Asignar Accesorios a Vestidos';
  vestidos: any[] = []; // Lista de vestidos
  accesoriosDisponibles: any[] = []; // Lista de accesorios disponibles
  accesoriosAsignados: any[] = []; // Lista de accesorios asignados
  selectedVestido: any; // Vestido seleccionado

  constructor(private http: HttpClient, private messageService: MessageService) {
    this.getVestidos(); // Cargar vestidos al inicializar el componente
    this.getAccesorios(); // Cargar accesorios al inicializar el componente
  }

  getVestidos() {
    this.http.get<any>(`${environment.api}/producto/`).subscribe(
      (response) => {
        this.vestidos = response; // Asigna los vestidos obtenidos a la variable vestidos
      },
      (error: any) => {
        console.error('Error al obtener los vestidos', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los vestidos' });
      }
    );
  }

  getAccesorios() {
    this.http.get<any>(`${environment.api}/accesorio/`).subscribe(
      (response) => {
        this.accesoriosDisponibles = response; // Asigna los accesorios obtenidos a la variable accesoriosDisponibles
      },
      (error: any) => {
        console.error('Error al obtener los accesorios', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron cargar los accesorios' });
      }
    );
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      // Reordenar elementos dentro de la misma lista
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // Mover elementos entre listas
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  guardarAccesorios() {
    
    
    const body={
       vestidoId : this.selectedVestido,
       accesorios : this.accesoriosAsignados.map((accesorio) => accesorio._id)

    }


    console.log(body)
    // Aquí puedes enviar una solicitud HTTP al servidor para guardar la información
    this.http.post(`${environment.api}/vestidos-accesorios`,body).subscribe(
      (response) => {
        this.messageService.add({ severity: 'success', summary: 'Éxito', detail: 'Accesorios guardados' });
      },
      (error: any) => {
        console.error('Error al guardar los accesorios', error);
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'No se pudieron guardar los accesorios' });
      }
    );
  }
}
