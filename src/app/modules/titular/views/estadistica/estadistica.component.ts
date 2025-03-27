import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-estadistica',
  templateUrl: './estadistica.component.html',
  styleUrls: ['./estadistica.component.scss'],
})
export class EstadisticaComponent implements OnInit {
  // Datos para gráficos
  rentasChartData: any;
  comparativoChartData: any;
  pieChartData: any;
  lineChartOptions: any;
  barChartOptions: any;
  pieChartOptions: any;
  tableData: any[] = [];

  ngOnInit() {
    this.initChartData();
    this.initTableData();
    this.initChartOptions();
  }

  initChartData() {
    // Datos para gráfico de líneas
    this.rentasChartData = {
      labels: ['16-31 Dic', '1-15 Ene', '16-31 Ene', '1-15 Feb', '16-28 Feb'],
      datasets: [
        {
          label: 'Gala',
          data: [13, 21, 32, 45, 59],
          borderColor: '#FF6384',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          tension: 0.4,
          borderWidth: 2,
        },
        {
          label: 'Noche',
          data: [12, 20, 31, 44, 58],
          borderColor: '#36A2EB',
          backgroundColor: 'rgba(54, 162, 235, 0.2)',
          tension: 0.4,
          borderWidth: 2,
        },
        {
          label: 'Coctel',
          data: [17, 26, 38, 51, 65],
          borderColor: '#FFCE56',
          backgroundColor: 'rgba(255, 206, 86, 0.2)',
          tension: 0.4,
          borderWidth: 2,
        },
      ],
    };

    // Datos para gráfico de barras comparativo
    this.comparativoChartData = {
      labels: ['Gala', 'Noche', 'Coctel'],
      datasets: [
        {
          label: 'Febrero',
          data: [59, 58, 65],
          backgroundColor: 'rgba(54, 162, 235, 0.7)',
        },
        {
          label: 'Marzo (Proyección)',
          data: [90, 89, 96],
          backgroundColor: 'rgba(75, 192, 192, 0.7)',
        },
      ],
    };

    // Datos para gráfico de pie
    this.pieChartData = {
      labels: ['Gala (90)', 'Noche (89)', 'Coctel (96)'],
      datasets: [
        {
          data: [90, 89, 96],
          backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
          hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        },
      ],
    };
  }

  initTableData() {
    const data = [
      {
        period: '1/enero/2025 - 15/enero/2025',
        gala: 6,
        noche: 5,
        coctel: 10,
        total: 21,
      },
      {
        period: '16/enero/2025 - 31/enero/2025',
        gala: 13,
        noche: 12,
        coctel: 17,
        total: 42,
      },
      {
        period: '1/febrero/2025 - 15/febrero/2025',
        gala: 21,
        noche: 20,
        coctel: 26,
        total: 67,
      },
      {
        period: '16/febrero/2025 - 28/febrero/2025',
        gala: 32,
        noche: 31,
        coctel: 38,
        total: 101,
      },
      {
        period: '1/marzo/2025 - 15/marzo/2025 (P)',
        gala: 45,
        noche: 44,
        coctel: 51,
        total: 140,
        isProjection: true,
      },
      {
        period: '16/marzo/2025 - 31/marzo/2025 (P)',
        gala: 59,
        noche: 58,
        coctel: 65,
        total: 182,
        isProjection: true,
      },
    ];

    this.tableData = data.map((item, index) => {
      const previousItem = data[index - 1];

      // Calculamos el incremento solo si hay un item anterior
      const increment = (current: number, previous: number) =>
        previous ? ((current - previous) / previous) * 100 : 0;

      const incrementGala = increment(item.gala, previousItem?.gala);
      const incrementNoche = increment(item.noche, previousItem?.noche);
      const incrementCoctel = increment(item.coctel, previousItem?.coctel);

      return {
        ...item,
        increment: {
          gala: `${incrementGala.toFixed(0)}%`,    // ✅ Backticks y paréntesis correctos
          noche: `${incrementNoche.toFixed(0)}%`,  // ✅ Backticks y paréntesis correctos
          coctel: `${incrementCoctel.toFixed(0)}%`, // ✅ Backticks y paréntesis correctos
        },
        color:
          incrementGala > 0 || incrementNoche > 0 || incrementCoctel > 0
            ? 'green'
            : 'red',
      };
    });
  }
 
  initChartOptions() {
    // Opciones para gráfico de líneas
    this.lineChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          mode: 'index',
          intersect: false,
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Vestidos Rentados',
            font: {
              size: 14,
            },
          },
        },
        x: {
          title: {
            display: true,
            text: 'Período',
            font: {
              size: 14,
            },
          },
        },
      },
    };

    // Opciones para gráfico de barras
    this.barChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
          labels: {
            font: {
              size: 14,
            },
          },
        },
      },
      scales: {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Vestidos Rentados',
            font: {
              size: 14,
            },
          },
        },
      },
    };

    // Opciones para gráfico de pie
    this.pieChartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
          labels: {
            font: {
              size: 14,
            },
          },
        },
        tooltip: {
          callbacks: {
            label: function (context: {
              label: string;
              raw: number;
              dataset: { data: any[] };
            }) {
              const label = context.label || '';
              const value = context.raw || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${value} (${percentage}%)`;
            },
          },
        },
      },
    };
  }
}