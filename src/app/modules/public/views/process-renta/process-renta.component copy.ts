import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from '../../../../shared/services/producto.service';
import { SwPush } from '@angular/service-worker';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Component({
  selector: 'app-process-renta',
  templateUrl: './process-renta.component.html',
  styleUrls: ['./process-renta.component.scss']
})
export class ProcessRentaComponent implements OnInit {

  isLoading: boolean = false;
  productId: string = '';
  Detalles: any;

  // Variables del formulario de renta
  arrendador: string = '';
  arrendatario: string = '';
  fechaInicio: string = '';
  fechaFin: string = '';
  direccionInmueble: string = '';
  montoRenta: number | null = null;
  contratoGenerado: boolean = false;
  publicKey: string = environment.publicKey;

  constructor(
    private swPush: SwPush,
    private activatedRoute: ActivatedRoute,
    private productoS_: ProductoService,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient,
    private ngxService: NgxUiLoaderService
  ) {}

  ngOnInit(): void {
    this.isLoading = true;
    this.scrollToTop();
    this.generarToken(); // Generamos el token antes de enviar los datos

    this.productId = this.activatedRoute.snapshot.params['id'];

    this.productoS_.obtenerDetalleProductoById(this.productId).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.Detalles = response;
        this.cdRef.detectChanges();
      },
      error: (err) => {
        this.isLoading = false;
        console.error('Error al obtener detalles:', err);
      }
    });
  }

  scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  // Método de submit del formulario
  onSubmit(): void {
    this.isLoading = true; // Activamos el loader
    this.generarToken(); // Generamos el token antes de enviar los datos
  }

  // Método para generar el token y enviarlo al backend
  generarToken(): void {
    this.swPush.requestSubscription({ serverPublicKey: this.publicKey })
      .then((sub) => {
        const token = JSON.stringify(sub);

        // Datos a enviar al backend
        const data = {
          arrendador: this.arrendador,
          arrendatario: this.arrendatario,
          fechaInicio: this.fechaInicio,
          fechaFin: this.fechaFin,
          direccionInmueble: this.direccionInmueble,
          montoRenta: this.montoRenta,
          productId: this.productId,
          token: token // Token generado
        };

        this.enviarTokenAlBackend(token); // Enviamos el token generado al backend
        // Enviar los datos al backend
        // this.productoS_.crearRenta(data).subscribe({
        //   next: (response) => {
        //     console.log('Renta creada exitosamente:', response);
        //     this.contratoGenerado = true;
        //     this.isLoading = false; // Desactivamos el loader
        //   },
        //   error: (err) => {
        //     console.error('Error al crear la renta:', err);
        //     this.isLoading = false; // Desactivamos el loader en caso de error
        //   }
        // });
      })
      .catch((err) => {
        console.error('Error al suscribirse a notificaciones:', err);
        this.isLoading = false;
      });
  }

  // Método para enviar el token de notificación al backend
  enviarTokenAlBackend(token: string): void {
    this.http.post('http://localhost:4000/api/v1/enviar-notificacion/ejemplo', { token })
      .subscribe(
        () => console.log('Token enviado al backend correctamente'),
        (err) => console.error('Error al enviar el token al backend:', err)
      );
  }
}
