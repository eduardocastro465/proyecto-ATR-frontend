import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VentayrentaService } from '../../../../shared/services/ventayrenta.service';

@Component({
  selector: 'app-listado-renta',
  templateUrl: './listado-renta.component.html',
  styleUrls: ['./listado-renta.component.scss']
})
export class ListadoRentaComponent implements OnInit {
  vistaActual: string = 'agregar'; // Controla la vista actual ('agregar', 'eliminar', 'listar')
  rentaForm!: FormGroup;
  rentas: any[] = []; // Almacena las rentas obtenidas del backend
  rentaId: string | null = null; // Almacena el ID de la renta que se está editando
  constructor(private fb: FormBuilder, private ventaYrentaS_: VentayrentaService) {}

  ngOnInit(): void {
    this.rentaForm = this.fb.group({
      usuarioId: ['', Validators.required],
      productoId: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
      metodoPago: ['', Validators.required],
      precioRenta: ['', Validators.required],
      estado: ['Pendiente', Validators.required]
    });

    // Cargar rentas al iniciar
    this.obtenerRentas();
  }
  guardarRenta(): void {
    if (this.rentaForm.valid) {
      const rentaData = this.rentaForm.value;
  
      if (this.rentaId) {
        // Editar renta existente
        this.ventaYrentaS_.editarRenta(this.rentaId, rentaData).subscribe(
          (res) => {
            console.log('Renta actualizada:', res);
            alert('Renta actualizada exitosamente');
            this.rentaForm.reset();
            this.rentaId = null; // Limpiar el ID después de editar
            this.vistaActual = 'listar'; // Volver a la vista de listado
            this.obtenerRentas(); // Actualizar la lista de rentas
          },
          (error) => {
            console.error('Error al actualizar renta:', error);
          }
        );
      } else {
        // Crear nueva renta
        this.ventaYrentaS_.crearRenta(rentaData).subscribe(
          (res) => {
            console.log('Renta creada:', res);
            alert('Renta creada exitosamente');
            this.rentaForm.reset();
            this.vistaActual = 'listar'; // Volver a la vista de listado
            this.obtenerRentas(); // Actualizar la lista de rentas
          },
          (error) => {
            console.error('Error al crear renta:', error);
          }
        );
      }
    }
  }
  crearRenta(): void {
    if (this.rentaForm.valid) {
      const rentaData = this.rentaForm.value;
  
      if (this.rentaId) {
        // Editar renta existente
        this.ventaYrentaS_.editarRenta(this.rentaId, rentaData).subscribe(
          (res) => {
            console.log('Renta actualizada:', res);
            alert('Renta actualizada exitosamente');
            this.rentaForm.reset();
            this.rentaId = ''; // Limpiar el ID después de editar
            this.obtenerRentas(); // Actualizar la lista de rentas
          },
          (error) => {
            console.error('Error al actualizar renta:', error);
          }
        );
      } else {
        // Crear nueva renta
        this.ventaYrentaS_.crearRenta(rentaData).subscribe(
          (res) => {
            console.log('Renta creada:', res);
            alert('Renta creada exitosamente');
            this.rentaForm.reset();
            this.obtenerRentas(); // Actualizar la lista de rentas
          },
          (error) => {
            console.error('Error al crear renta:', error);
          }
        );
      }
    }
  }

  eliminarRenta(): void {
    if (this.rentaId) {
      this.ventaYrentaS_.cancelarRenta({ rentaId: this.rentaId }).subscribe(
        (res) => {
          console.log('Renta eliminada:', res);
          alert('Renta eliminada exitosamente');
          this.rentaId = '';
          this.obtenerRentas(); // Actualizar la lista de rentas
        },
        (error) => {
          console.error('Error al eliminar renta:', error);
        }
      );
    } else {
      alert('Por favor, ingrese un ID de renta válido');
    }
  }

  obtenerRentas(): void {
    this.ventaYrentaS_.obtenerRentas().subscribe(
      (res) => {
        this.rentas = res.rentas.map((renta: any) => {
          const fechaInicio = new Date(renta.detallesRenta.fechaInicio);
          const fechaFin = new Date(renta.detallesRenta.fechaFin);
          
          return {
            ...renta,
            usuarioNombre: renta.usuario?.nombre || 'Usuario no disponible',
            productoNombre: renta.producto?.nombre || 'Producto no disponible',
            categoriaNombre: renta.producto?.idCategoria?.nombre || 'Sin categoría', // Nueva propiedad
            estado: renta.estado , // Nueva propiedad
            detallesRenta: {
              ...renta.detanllesRenta,
              fechaInicio: fechaInicio.toISOString().split('T')[0],
              fechaFin: fechaFin.toISOString().split('T')[0]
            },
            precioFormateado: this.formatearPrecio(renta.detallesPago.precioRenta)
          };
        });
      },
      (error) => {
        console.error('Error al obtener rentas:', error);
      }
    );
  }
  
  // Función auxiliar para formatear precio
  formatearPrecio(precio: number): string {
    return new Intl.NumberFormat('es-MX', { 
      style: 'currency', 
      currency: 'MXN' 
    }).format(precio);
  }
  eliminarRentaPorId(rentaId: string): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta renta?')) {
      this.ventaYrentaS_.cancelarRenta({ rentaId }).subscribe(
        (res) => {
          console.log('Renta eliminada:', res);
          alert('Renta eliminada exitosamente');
          this.obtenerRentas(); // Actualizar la lista de rentas
        },
        (error) => {
          console.error('Error al eliminar renta:', error);
        }
      );
    }
  }
  editarRenta(renta: any): void {
    this.vistaActual = 'editar'; // Cambiar a la vista de edición
    this.rentaId = renta._id; // Guardar el ID de la renta seleccionada
    this.rentaForm.patchValue({
      usuarioId: renta.usuario,
      productoId: renta.producto?._id || '',
      fechaInicio: renta.detallesRenta.fechaInicio.split('T')[0], // Formatear la fecha
      fechaFin: renta.detallesRenta.fechaFin.split('T')[0], // Formatear la fecha
      metodoPago: renta.detallesPago.metodoPago,
      precioRenta: renta.detallesPago.precioRenta,
      estado: renta.estado,
    });
  }

   formatearFecha(fecha: string): string {
    const date = new Date(fecha);
    const dia = date.getDate().toString().padStart(2, '0');
    const mes = (date.getMonth() + 1).toString().padStart(2, '0'); // Los meses comienzan desde 0
    const anio = date.getFullYear();
    return `${dia}/${mes}/${anio}`;
  }

}