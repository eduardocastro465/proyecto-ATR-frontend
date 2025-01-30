import { HttpClient } from "@angular/common/http";
import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from "@angular/core";
import { Subject } from "rxjs";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { environment } from "../../../../../environments/environment";
import { catchError, map } from "rxjs/operators";
import { Observable, of } from "rxjs";
import { ActivatedRoute, Router } from "@angular/router";
import { ProductoService } from "../../../../shared/services/producto.service";

@Component({
  selector: "app-results",
  templateUrl: "./results.component.html",
  styleUrls: ["./results.component.scss"],
})
export class ResultsComponent implements OnInit {
  results!: any[];
  query!: string;
  resultadosEncontrados: boolean = true;
  showHeader: boolean = true;

  originalProducts: any[] = [];
  allProducts: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private productS_: ProductoService
  ) {}

  ngOnInit(): void {
    // Recuperar los parámetros de consulta directamente desde la URL
    this.route.queryParams.subscribe((queryParams) => {
      const { categoria, color, tallas } = queryParams;

      // Si hay filtros en los parámetros de consulta
      if (categoria || color || tallas) {
        const filtros = {
          categoria: categoria || null,
          color: color || null,
          tallas: tallas ? tallas.split(",") : [], // Convierte la lista de tallas en un array
        };

        this.buscarProductosAvanzados(categoria, color, tallas);
      } else {
        // Si no hay parámetros, cargar todos los productos
        this.cargarTodosLosProductos();
      }
    });
    // Recuperar los parámetros de la ruta, ya sea como query o como un objeto JSON
    this.route.params.subscribe((params) => {
      // Obtener el query de los parámetros
      this.query = params["query"];

      // También puedes obtener el JSON si lo estás pasando en los parámetros
      // const json = params['json'] ? JSON.parse(params['json']) : null;

      // if (json) {

      //   // this.jsonQuery = json;
      //   this.buscarProductosAvanzados(json); // Llamar búsqueda avanzada
      // } else {
      // Validación del query y buscar productos si es necesario
      if (!this.query || this.query.trim() === "") {
        this.resultadosEncontrados = false;
        this.cargarTodosLosProductos();
        return;
      }
      this.buscarProductos();
      // }
    });
    this.scrollToTop();
  }
  scrollToTop() {
    window.scrollTo(0, 0); // Esto lleva la página a la parte superior
  }
  private buscarProductosAvanzados(
    categoria: any,
    color: any,
    tallaDisponible: any
  ): void {
    this.http
      .post(`${environment.api}/producto/buscarAvanzados`, {
        categoria,
        color,
        tallaDisponible,
      })
      .subscribe({
        next: (data: any) => {
          console.error(
            "búsqueda avanzada:",
            categoria,
            color,
            tallaDisponible
          );
          if (data && data.resultados && data.resultados.length > 0) {
            this.results = data.resultados;
            console.error("búsqueda avanzada:", data.resultados);

            this.resultadosEncontrados = true;
          } else {
            this.resultadosEncontrados = false;
            this.results = [];
          }
        },
        error: (error) => {
          console.error("Error en búsqueda avanzada:", error);
          this.resultadosEncontrados = false;
          this.results = [];
        },
      });
  }

  private buscarProductos(): void {
    if (!this.query || this.query.trim().length < 2) {
      this.resultadosEncontrados = false;
      this.cargarTodosLosProductos();
      return;
    }

    this.http
      .get(`${environment.api}/producto/buscar/${this.query}`)
      .subscribe({
        next: (data: any) => {
          if (data && data.resultados && data.resultados.length > 0) {
            this.results = data.resultados;
            this.originalProducts = data.resultados;
            this.resultadosEncontrados = true;
          } else {
            this.resultadosEncontrados = false;
            this.cargarTodosLosProductos();
          }
        },
        error: (error) => {
          console.error("Error en la búsqueda:", error);
          this.resultadosEncontrados = false;
          this.cargarTodosLosProductos();
        },
      });
  }

  private cargarTodosLosProductos(): void {
    this.productS_.obtenerProductos().subscribe({
      next: (data) => {
        this.allProducts = data;
      },
      error: (error) => {
        console.error("Error al cargar todos los productos:", error);
      },
    });
  }

  // Navegar a detalles de producto
  verDetalles(product: any): void {
    this.router.navigateByUrl(`public/Detail/${product}`);
  }
}
