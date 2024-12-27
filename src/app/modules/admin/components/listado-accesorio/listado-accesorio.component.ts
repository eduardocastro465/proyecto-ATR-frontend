import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-listado-accesorio',
  templateUrl: './listado-accesorio.component.html',
  styleUrl: './listado-accesorio.component.scss',
})
export class ListadoAccesorioComponent {


  displayModal:boolean=false
  open() {
    this.displayModal=!this.displayModal;
  }
}
