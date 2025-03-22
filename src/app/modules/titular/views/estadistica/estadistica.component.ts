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
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit, AfterViewInit {
  // Datos de tarjetas
  totalVestidosRentados: number = 500;
  vestidosEnInventario: number = 800;
  aumentoPorcentual: number = 12;
  tasaDisminucionInventario: number = 8;
  vestidosProyectados: number = 0;

  estimacionFiltrada: any = {};

  // Categorías para el dropdown
  categorias = [
    { label: 'Cuello halter', value: 'CuelloHalter' },
    { label: 'Cuello redondo', value: 'CuelloRedondo' },
    { label: 'Cuello cuadrado', value: 'CuelloCuadrado' },
    { label: 'Escote en forma de corazón', value: 'EscoteCorazon' },
    { label: 'Escote de hombros descubiertos', value: 'EscoteHombrosDescubiertos' },
    { label: 'Escote en V', value: 'EscoteV' },
    { label: 'Vestido largo con cola', value: 'VestidoLargoCola' },
    { label: 'Vestido largo tipo campana', value: 'VestidoLargoCampana' },
    { label: 'Vestido largo recto', value: 'VestidoLargoRecto' },
    { label: 'Vestido largo de sirena', value: 'VestidoLargoSirena' },
    { label: 'Vestido largo con corte princesa', value: 'VestidoLargoCortePrincesa' },
  ];

  categoriaSeleccionada: { label: string; value: string } = this.categorias[0]; // Selecciona la primera categoría por defecto

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

  // 📌 Filtrar la estimación basada en la categoría seleccionada
  filtrarEstimacion() {
    if (!this.estimacionInventarioData) {
      console.warn('⚠️ Datos aún no están disponibles.');
      return;
    }

    // Obtener la clave de la categoría seleccionada
    const categoriaKey = this.categoriaSeleccionada.value;

    console.log('📊 Filtrando categoría:', categoriaKey);

    // Asignar los datos filtrados
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
      CuelloHalter: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Cuello halter',
            data: [200, 150, 100, 50],
            borderColor: '#007bff',
            backgroundColor: 'rgba(0, 123, 255, 0.4)',
            fill: true,
          },
        ],
      },
      CuelloRedondo: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Cuello redondo',
            data: [180, 130, 90, 40],
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.4)',
            fill: true,
          },
        ],
      },
      CuelloCuadrado: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Cuello cuadrado',
            data: [180, 130, 90, 40],
            borderColor: '#FF6384',
            backgroundColor: 'rgba(255, 99, 132, 0.4)',
            fill: true,
          },
        ],
      },
      EscoteCorazon: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Escote en forma de corazón',
            data: [120, 90, 80, 60],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.4)',
            fill: true,
          },
        ],
      },
      EscoteHombrosDescubiertos: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Escote de hombros descubiertos',
            data: [150, 110, 85, 70],
            borderColor: '#AB47BC',
            backgroundColor: 'rgba(171, 71, 188, 0.4)',
            fill: true,
          },
        ],
      },
      EscoteV: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Escote en V',
            data: [140, 100, 75, 50],
            borderColor: '#26A69A',
            backgroundColor: 'rgba(38, 166, 154, 0.4)',
            fill: true,
          },
        ],
      },
      VestidoLargoCola: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Vestido largo con cola',
            data: [130, 95, 85, 60],
            borderColor: '#8D6E63',
            backgroundColor: 'rgba(141, 110, 99, 0.4)',
            fill: true,
          },
        ],
      },
      VestidoLargoCampana: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Vestido largo tipo campana',
            data: [140, 105, 90, 70],
            borderColor: '#42A5F5',
            backgroundColor: 'rgba(66, 165, 245, 0.4)',
            fill: true,
          },
        ],
      },
      VestidoLargoRecto: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Vestido largo recto',
            data: [160, 120, 100, 80],
            borderColor: '#7E57C2',
            backgroundColor: 'rgba(126, 87, 194, 0.4)',
            fill: true,
          },
        ],
      },
      VestidoLargoSirena: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Vestido largo de sirena',
            data: [150, 110, 95, 75],
            borderColor: '#FF7043',
            backgroundColor: 'rgba(255, 112, 67, 0.4)',
            fill: true,
          },
        ],
      },
      VestidoLargoCortePrincesa: {
        labels: ['1 mes', '2 meses', '3 meses', '4 meses'],
        datasets: [
          {
            label: 'Vestido largo con corte princesa',
            data: [170, 130, 110, 90],
            borderColor: '#EF5350',
            backgroundColor: 'rgba(239, 83, 80, 0.4)',
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
      labels: ['S', 'M', 'L'], // Tallas
      datasets: this.categorias.map((categoria, index) => {
        const colores = [
          '#FF6384', // Rojo
          '#36A2EB', // Azul
          '#FFCE56', // Amarillo
          '#4BC0C0', // Turquesa
          '#9966FF', // Morado
          '#FF9F40', // Naranja
          '#C9CBCF', // Gris
          '#00CC99', // Verde
          '#FF6B6B', // Rojo claro
          '#4D80E6', // Azul oscuro
          '#FFD700', // Dorado
        ];
        return {
          label: categoria.label, // Nombre de la categoría
          data: [Math.floor(Math.random() * 50) + 20, Math.floor(Math.random() * 50) + 20, Math.floor(Math.random() * 50) + 20], // Datos aleatorios para S, M, L
          backgroundColor: colores[index % colores.length], // Asignar colores únicos
        };
      }),
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

    this.filtrarEstimacion(); // Filtra la estimación inicial
  }
}