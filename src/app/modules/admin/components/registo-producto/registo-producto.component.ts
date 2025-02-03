import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { ProductoService } from '../../../../shared/services/producto.service';

@Component({
  selector: 'app-registo-producto',
  templateUrl: './registo-producto.component.html',
  styleUrls: ['./registo-producto.component.scss'],
})
export class RegistoProductoComponent implements OnInit,OnChanges {
  @Input() mostrarModalAddVestido!:boolean;
  @Output() mostrarFormulario = new EventEmitter<boolean>(); // Evento para cerrar el modal

  cerrar() {
    console.log("cerrado")
    this.mostrarFormulario.emit(false); // Emitimos false para cerrar el modal
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["mostrarFormulario"]) {
      const newVluesmostrarFormulario = changes["mostrarFormulario"].currentValue;
      this.mostrarModalAddVestido = newVluesmostrarFormulario; // Actualizamos el valor para cerrar el modal
    
      console.log("mostrarFormulario cambió a:", newVluesmostrarFormulario);
    }

    // Aquí puedes agregar lógica adicional si es necesario
  }
  productoForm: FormGroup;

  imagenPrincipal: File | null = null; // Inicializa con null
  imagenesAdicionales: File[] = []; // Inicializa como un array vacío

  constructor(
    private fb: FormBuilder,
    private productoService: ProductoService
  ) {
    this.productoForm = this.fb.group({
      nombre: ['', [Validators.required]],
      imagenPrincipal: [''], // Aquí sigue siendo un string
      otrasImagenes: this.fb.array([]), // Inicializa el FormArray
      categoria: ['venta', [Validators.required]],
      color: ['', [Validators.required]],
      textura: [''],
      talla: ['', [Validators.required]],
      altura: ['', [Validators.required, Validators.min(30)]],
      cintura: ['', [Validators.required, Validators.min(20)]],
      precio: [0, [Validators.required, Validators.min(0)]],
      disponible: [true],
      tipoVenta: ['Venta', [Validators.required]],
      nuevo: [true],
      descripcion: [''],
    });
  }

  ngOnInit(): void {}

  get otrasImagenes(): FormArray {
    return this.productoForm.get('otrasImagenes') as FormArray;
  }

  onImagePrincipalChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        // Convertir a string y asignar
        this.productoForm.patchValue({
          imagenPrincipal: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para eliminar la imagen principal
  eliminarImagenPrincipal() {
    this.productoForm.get('imagenPrincipal')?.setValue(''); // Limpia el valor del control
  }

  // Método para eliminar una imagen del FormArray
  eliminarImagen(index: number) {
    this.otrasImagenes.removeAt(index);
  }
  onFileSelected(event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      this.imagenPrincipal = inputElement.files[0];
      const file = inputElement.files[0];

      console.log(this.imagenPrincipal);
      const reader = new FileReader();

      reader.onload = () => {
        // Convertir a string y asignar
        this.productoForm.patchValue({
          imagenPrincipal: reader.result as string,
        });
      };
      reader.readAsDataURL(file);
    }
  }

  agregarImagen() {
    this.otrasImagenes.push(this.fb.control('')); // Añade un control vacío al FormArray
  } // Maneja la selección de imágenes adicionales
  otrasImagenesChange(event: Event, index: number): void {
    const inputElement = event.target as HTMLInputElement;
    if (inputElement.files && inputElement.files.length > 0) {
      const file = inputElement.files[0];

      // Guarda el archivo en el arreglo
      this.imagenesAdicionales[index] = file;

      console.log(
        `Nombre del archivo seleccionado para imagen adicional ${index + 1}: ${
          file.name
        }`
      );

      // Crea un FileReader para leer el contenido del archivo
      const reader = new FileReader();
      reader.onload = () => {
        this.otrasImagenes.at(index).setValue(reader.result as string); // Almacena la URL en el FormArray

        // console.log(`Preview de la imagen ${index + 1}:`, this.imagenesAdicionalesPreview[index]);
      };
      reader.readAsDataURL(file);

      // Mostrar el contenido actual del arreglo imagenesAdicionales
      console.log(
        'Contenido actual de imagenesAdicionales:',
        this.imagenesAdicionales
      );
    }
  }
  // } // Método para agregar el producto
  onAgregarProducto() {
    const productoNombre = this.productoForm.get('nombre')?.value;
    const productoCategoria = this.productoForm.get('categoria')?.value;
    const productoPrecio = this.productoForm.get('precio')?.value;
    const talla = this.productoForm.get('talla')?.value;
    const altura = this.productoForm.get('altura')?.value;
    const cintura = this.productoForm.get('cintura')?.value;
    const productoDescripcion = this.productoForm.get('descripcion')?.value;
    const nuevo = this.productoForm.get('nuevo')?.value;

    // Verificar si se ha seleccionado una imagen principal
    if (!this.imagenPrincipal) {
      console.error(
        'No se ha seleccionado ningún archivo para la imagen principal.'
      );
      return;
    } else {
      console.log('Imagen principal seleccionada:', this.imagenPrincipal);
    }

    // Crear un objeto FormData y agregar los campos necesarios
    const formData = new FormData();
    formData.append('nombre', productoNombre);
    formData.append('categoria', productoCategoria);
    formData.append('precio', productoPrecio);
    formData.append('talla	', talla);
    formData.append('altura', altura);
    formData.append('cintura', cintura);
    formData.append('descripcion', productoDescripcion);
    formData.append('nuevo', nuevo);

    // Agregar la imagen principal al FormData
    formData.append('imagenPrincipal', this.imagenPrincipal); // El nombre debe coincidir con el esperado en el backend

    // Verificar y agregar las imágenes adicionales al FormData
    if (this.imagenesAdicionales && this.imagenesAdicionales.length > 0) {
      this.imagenesAdicionales.forEach((imagen, index) => {
        formData.append(`otrasImagenes`, imagen); // Ajusta el nombre según lo que el backend espera
      });
    }

    // Mostrar el contenido de FormData (solo para depuración; los archivos no se imprimen directamente)
    console.log('Contenido del FormData:');
    formData.forEach((value, key) => {
      if (value instanceof File) {
        console.log(`${key}: Archivo - ${value.name}`);
      } else {
        console.log(`${key}:`, value);
      }
    });

    // Enviar el FormData al servicio del backend
    this.productoService.crearProducto(formData).subscribe(
      (response) => {
        console.log('Producto creado exitosamente:', response);
      },
      (err) => {
        console.error('Error al crear el producto:', err);
        // Swal.fire('Error', 'Hubo un error al agregar el producto.', 'error');
      }
    );
  }
}
