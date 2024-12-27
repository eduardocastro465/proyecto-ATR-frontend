import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-accesorio',
  templateUrl: './add-accesorio.component.html',
  styleUrl: './add-accesorio.component.scss'
})
export class AddAccesorioComponent {
  @Input() displayModal:boolean=false;

  projectForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.projectForm = this.formBuilder.group({
      projectName: ['', Validators.required],
      projectImage: ['', Validators.required],
      agreeTerms: [false, Validators.requiredTrue]
    });
  }

  createProject() {
    if (this.projectForm.valid) {
      // Lógica para crear el proyecto
      console.log(this.projectForm.value);
      this.displayModal = false;
    }
  }

}
