import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
// Importa tu servicio (el nombre y ruta puede variar)
import { ProductoService } from '../../../../shared/services/producto.service';

@Component({
  selector: 'app-process-renta',
  templateUrl: './process-renta.component.html',
  styleUrls: ['./process-renta.component.scss']
})
export class ProcessRentaComponent implements OnInit {
  
  // Variables para el control de carga y datos del producto
  isLoading: boolean = false;
  productId: string = '';
  Detalles: any;

  // Variables para el formulario de renta
  arrendador: string = '';
  arrendatario: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  direccionInmueble: string = '';
  montoRenta: number | null = null;
  contratoGenerado: boolean = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private productoS_: ProductoService,
    private cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.scrollToTop();

    // Obtenemos el ID del producto desde la ruta
    this.productId = this.activatedRoute.snapshot.params['id'];

    // Llamamos al servicio para obtener detalles del producto
    this.productoS_.obtenerDetalleProductoById(this.productId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.Detalles = response;
        // Forzamos la detección de cambios si es necesario
        this.cdRef.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al obtener detalles:', err);
      }
    });
  }

  // Ejemplo de método para hacer scroll al inicio
  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Método para el submit del formulario
  onSubmit(): void {
    // Aquí podrías realizar validaciones o lógica adicional
    this.contratoGenerado = true;
  }
}
