import {
  Component,
  AfterViewInit,
  ChangeDetectorRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartModule } from 'primeng/chart';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-estadistica',
  standalone: false,
  // standalone: true,
  // imports: [CommonModule, ChartModule, DropdownModule, FormsModule],
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent {
  // Datos de tarjetas
  totalVestidosRentados: number = 500;
  vestidosEnInventario: number = 800;
  aumentoPorcentual: number = 12;
  tasaDisminucionInventario: number = 8;
  vestidosProyectados: number = 0;

  estimacionFiltrada: any = {};

  categorias = [
    { label: 'Gala', value: 'gala' },
    { label: 'Fiesta', value: 'fiesta' },
    // { label: 'Casual', value: 'casual' },
  ];

  categoriaSeleccionada: string | { label: string; value: string } = 'gala';

  // Datos de los gráficos
  tallaChartData: any;
  estimacionInventarioData: any;
  categoriaChartData: any;
  aumentoRentasData: any;
  tasaDisminucionData: any;
  tallasPorCategoriaChartData: any;
  proyeccionInventarioData: any;

  constructor(private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadChartData();
    this.calcularProyeccionInventario();
    setTimeout(() => {
      this.filtrarEstimacion(); // 🔹 Esperamos un ciclo antes de filtrar
    }, 100);
  }

  ngAfterViewInit() {
    this.cdr.detectChanges();
  }

  // 📌 Calcular la proyección de vestidos en inventario a 30 días
  calcularProyeccionInventario() {
    const tasaDiaria = this.tasaDisminucionInventario / 7; // Convertimos a tasa diaria
    this.vestidosProyectados = Math.round(
      this.vestidosEnInventario * Math.exp(-tasaDiaria * 30)
    );
  }
  filtrarEstimacion() {
    if (!this.estimacionInventarioData) {
      console.warn('⚠️ Datos aún no están disponibles.');
      return;
    }

    // Si `categoriaSeleccionada` es un objeto, toma `value`, si es un string, úsalo directamente.
    const categoriaKey =
      typeof this.categoriaSeleccionada === 'string'
        ? this.categoriaSeleccionada
        : this.categoriaSeleccionada.value;

    console.log('📊 Filtrando categoría:', categoriaKey);

    this.estimacionFiltrada = this.estimacionInventarioData[categoriaKey] || {
      labels: [],
      datasets: [],
    };

    console.log('📊 Datos después de filtrar:', this.estimacionFiltrada);

    this.cdr.detectChanges();
  }

  // 📌 Cargar datos para los gráficos
  loadChartData() {
    this.tallaChartData = {
      labels: ['S', 'M', 'L', 'XL'],
      datasets: [
        {
          label: 'Vestidos Rentados',
          data: [120, 150, 100, 130],
          backgroundColor: '#007bff',
        },
      ],
    };

    this.estimacionInventarioData = {
      gala: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Gala',
            data: [200, 150, 100, 50],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.4)',
            fill: true,
          },
        ],
      },
      fiesta: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Fiesta',
            data: [180, 130, 90, 40],
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.4)',
            fill: true,
          },
        ],
      },
      categorias: {
        labels: [
          'Cuello halter',
          'Cuello redondo',
          'Cuello cuadrado',
          'Escote en forma de corazón',
          'Escote de hombros descubiertos',
          'Escote en V',
          'Vestido largo con cola',
          'Vestido largo tipo campana',
          'Vestido largo recto',
          'Vestido largo de sirena',
          'Vestido largo con corte princesa',
        ],
        datasets: [
          {
            label: 'Categorías',
            data: [120, 90, 110, 80, 70, 100, 130, 95, 85, 140, 115], // Valores de ejemplo
            borderColor: '#4CAF50', // Verde
            backgroundColor: 'rgba(76, 175, 80, 0.4)', // Verde con transparencia
            fill: true,
          },
        ],
      },
    };

    this.categoriaChartData = {
      labels: [
        'Cuello halter',
        'Cuello redondo',
        'Cuello cuadrado',
        'escote en forma de corazón',
        'escote de hombros descubiertos',
        'Escote en V',
        'Vestido largo con cola',
        'Vestido largo tipo campana',
        'Vestido largo recto',
        'Vestido largo de sirena',
        'Vestido largo con corte princesa',

      ],
      datasets: [
        {
          data: [180, 140, 120, 90, 200, 150, 80, 110, 70, 130], // Valores para cada categoría
          backgroundColor: [
            '#007bff', // Azul
            '#66BB6A', // Verde
            '#FFA726', // Naranja
            '#EF5350', // Rojo
            '#AB47BC', // Morado
            '#26A69A', // Turquesa
            '#8D6E63', // Marrón
            '#42A5F5', // Azul claro
            '#7E57C2', // Lila
            '#FF7043', // Naranja claro
          ],
        },
      ],
    };

    this.aumentoRentasData = {
      labels: ['Enero', 'Febrero', 'Marzo', 'Abril'],
      datasets: [
        {
          label: 'Aumento (%)',
          data: [5, 10, 15, 20],
          backgroundColor: 'rgba(0, 123, 255, 0.4)',
          borderColor: '#007bff',
        },
      ],
    };

    this.tasaDisminucionData = {
      labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      datasets: [
        {
          label: 'Disminución (%)',
          data: [3, 7, 12, 18],
          borderColor: '#007bff',
          backgroundColor: 'rgba(0, 123, 255, 0.4)',
          fill: true,
        },
      ],
    };

    // 📌 Nueva gráfica: Tallas Rentadas por Categoría
    this.tallasPorCategoriaChartData = {
      labels: ['S', 'M', 'L'],
      datasets: [
        {
          label: 'Gala',
          data: [20, 40, 40],
          backgroundColor: '#FF6384',
        },
        {
          label: 'Fiesta',
          data: [25, 35, 40],
          backgroundColor: '#36A2EB',
        },
      ],
    };

    // 📌 Nueva gráfica: Proyección de Inventario
    this.proyeccionInventarioData = {
      labels: ['Día 0', 'Día 7', 'Día 15', 'Día 21', 'Día 30'],
      datasets: [
        {
          label: 'Vestidos Disponibles',
          data: [500, 380, 299, 243, this.vestidosProyectados],
          borderColor: '#FFCE56',
          backgroundColor: 'rgba(255, 206, 86, 0.5)',
          fill: true,
        },
      ],
    };
    this.filtrarEstimacion();
  }
}
