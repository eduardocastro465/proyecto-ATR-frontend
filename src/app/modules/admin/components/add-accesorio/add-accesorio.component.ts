import { Component, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-accesorio',
  templateUrl: './add-accesorio.component.html',
  styleUrls: ['./add-accesorio.component.scss',
  ],
})
export class AddAccesorioComponent {
  @Input() displayModal: boolean = false;

  accesorioForm: FormGroup;
  imagenPrincipal: File | null = null; // Para almacenar la imagen principal

  constructor(private formBuilder: FormBuilder, private http: HttpClient) {
    this.accesorioForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      imagenPrincipal: ['', Validators.required],
      disponible: [true], // Por defecto, disponible es true
    });
  }

  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.imagenPrincipal = inputElement.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.accesorioForm.patchValue({
          imagenPrincipal: reader.result as string, // Almacena la URL de la imagen
        });
      };
      reader.readAsDataURL(this.imagenPrincipal);
    }
  }

  createAccesorio() {
    if (this.accesorioForm.valid && this.imagenPrincipal) {
      const formData = new FormData();
      formData.append('nombre', this.accesorioForm.get('nombre')?.value);
      formData.append('imagenPrincipal', this.imagenPrincipal);
      formData.append('disponible', this.accesorioForm.get('disponible')?.value);


      console.log('Contenido del FormData:');
      formData.forEach((value, key) => {
        if (value instanceof File) {
          console.log(`${key}: Archivo - ${value.name}`);
        } else {
          console.log(`${key}:`, value);
        }
      });

      // Enviar el FormData al backend
      this.http.post('http://localhost:4000/api/v1/accesorio/', formData).subscribe(
        (response) => {
          console.log('Accesorio creado exitosamente:', response);
          this.displayModal = false; // Cerrar el modal después de agregar el accesorio
        },
        (err) => {
          console.error('Error al crear el accesorio:', err);
        }
      );
    }
  }
}
