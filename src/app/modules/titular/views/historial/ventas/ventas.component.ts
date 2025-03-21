import { Component } from "@angular/core";

@Component({
  selector: "app-ventas",
  templateUrl: "./ventas.component.html",
  styleUrls: ["./ventas.component.scss"],
})
export class VentasComponent {
  fechaInicio!: string;
  fechaFin!: string;
  ventas = [
    {
      fecha: "2010-01-15",
      producto: "Vestido de Verano",
      cantidad: 10,
      total: 500,
      metodoPago: "Tarjeta",
    },
    {
      fecha: "2011-05-01",
      producto: "Vestido de Noche",
      cantidad: 5,
      total: 250,
      metodoPago: "Efectivo",
    },
    {
      fecha: "2012-09-20",
      producto: "Vestido Casual",
      cantidad: 20,
      total: 600,
      metodoPago: "Transferencia",
    },
    {
      fecha: "2013-03-10",
      producto: "Vestido Elegante",
      cantidad: 50,
      total: 750,
      metodoPago: "Tarjeta",
    },
    {
      fecha: "2014-07-05",
      producto: "Camisa de Seda",
      cantidad: 15,
      total: 400,
      metodoPago: "Efectivo",
    },
    {
      fecha: "2015-11-30",
      producto: "Pantalón de Vestir",
      cantidad: 30,
      total: 800,
      metodoPago: "Tarjeta",
    },
    {
      fecha: "2016-02-28",
      producto: "Blusa de Gasa",
      cantidad: 8,
      total: 200,
      metodoPago: "Transferencia",
    },
    {
      fecha: "2017-06-15",
      producto: "Falda de Cuero",
      cantidad: 12,
      total: 600,
      metodoPago: "Efectivo",
    },
    {
      fecha: "2018-08-01",
      producto: "Chaqueta de Lana",
      cantidad: 18,
      total: 900,
      metodoPago: "Tarjeta",
    },
    {
      fecha: "2019-12-24",
      producto: "Suéter de Algodón",
      cantidad: 25,
      total: 700,
      metodoPago: "Transferencia",
    },
    {
      fecha: "2020-04-30",
      producto: "Vestido de Fiesta",
      cantidad: 7,
      total: 350,
      metodoPago: "Efectivo",
    },
    {
      fecha: "2021-09-10",
      producto: "Pantalón Vaquero",
      cantidad: 22,
      total: 550,
      metodoPago: "Tarjeta",
    },
    {
      fecha: "2022-03-01",
      producto: "Camiseta de Algodón",
      cantidad: 30,
      total: 400,
      metodoPago: "Transferencia",
    },
    {
      fecha: "2023-11-15",
      producto: "Falda de Seda",
      cantidad: 9,
      total: 450,
      metodoPago: "Efectivo",
    },
    {
      fecha: "2024-06-20",
      producto: "Abrigo de Invierno",
      cantidad: 14,
      total: 800,
      metodoPago: "Tarjeta",
    },
  ];

  data = {
    labels: this.ventas.map((venta) => venta.fecha),
    datasets: [
      {
        label: "Ventas",
        data: this.ventas.map((venta) => venta.total),
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  };

  ventasResumen = {
    totalVentas: this.ventas.reduce((total, venta) => total + venta.total, 0),
    ventasOnline: this.ventas.filter((venta) => venta.metodoPago === "Tarjeta").reduce((total, venta) => total + venta.total, 0),
    ventasPresenciales: this.ventas.filter((venta) => venta.metodoPago !== "Tarjeta").reduce((total, venta) => total + venta.total, 0),
    porcentajeOnline: (this.ventas.filter((venta) => venta.metodoPago === "Tarjeta").reduce((total, venta) => total + venta.total, 0) / this.ventas.reduce((total, venta) => total + venta.total, 0)) * 100,
    porcentajePresencial: (this.ventas.filter((venta) => venta.metodoPago !== "Tarjeta").reduce((total, venta) => total + venta.total, 0) / this.ventas.reduce((total, venta) => total + venta.total, 0)) * 100,
  };

  generarReporte() {
    console.log("Generando reporte de ventas...");
    // Aquí puedes agregar lógica para descargar un PDF o exportar a Excel
  }
  aniosUnicos!: string[];
  mesesUnicos!: string[];
  anioSeleccionado!: string;
  mesSeleccionado!: string;

  constructor() {
    this.obtenerAniosYMesesUnicos();
  }

  obtenerAniosYMesesUnicos() {
    const fechas = this.ventas.map((venta) => venta.fecha);
    const anios = Array.from(new Set(fechas.map((fecha) => fecha.slice(0, 4))));
    const meses = Array.from(new Set(fechas.map((fecha) => fecha.slice(5, 7))));

    this.aniosUnicos = anios.sort((a, b) => parseInt(a) - parseInt(b));
    this.mesesUnicos = meses.sort((a, b) => parseInt(a) - parseInt(b));
  }

  filtrarVentas() {
    let filtroFecha = this.ventas;

    if (this.anioSeleccionado) {
      filtroFecha = filtroFecha.filter((venta) => venta.fecha.slice(0, 4) === this.anioSeleccionado);
    }

    if (this.mesSeleccionado) {
      filtroFecha = filtroFecha.filter((venta) => venta.fecha.slice(5, 7) === this.mesSeleccionado);
    }

    this.data = {
      labels: filtroFecha.map((venta) => venta.fecha),
      datasets: [
        {
          label: "Ventas",
          data: filtroFecha.map((venta) => venta.total),
          fill: false,
          borderColor: "rgb(75, 192, 192)",
          tension: 0.1,
        },
      ],
    };

    this.ventasResumen = {
      totalVentas: filtroFecha.reduce((total, venta) => total + venta.total, 0),
      ventasOnline: filtroFecha.filter((venta) => venta.metodoPago === "Tarjeta").reduce((total, venta) => total + venta.total, 0),
      ventasPresenciales: filtroFecha.filter((venta) => venta.metodoPago !== "Tarjeta").reduce((total, venta) => total + venta.total, 0),
      porcentajeOnline: (filtroFecha.filter((venta) => venta.metodoPago === "Tarjeta").reduce((total, venta) => total + venta.total, 0) / filtroFecha.reduce((total, venta) => total + venta.total, 0)) * 100,
      porcentajePresencial: (filtroFecha.filter((venta) => venta.metodoPago !== "Tarjeta").reduce((total, venta) => total + venta.total, 0) / filtroFecha.reduce((total, venta) => total + venta.total, 0)) * 100,
    };
  }


   
}