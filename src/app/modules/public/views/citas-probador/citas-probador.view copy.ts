import { Component, OnInit } from "@angular/core";
import { IndexedDbService } from "../../commons/services/indexed-db.service";
import { Router } from "@angular/router";
declare const $: any;

export interface DressItem {
  id: string;
  nombre: string;
  precio: number;
  imagenPrincipal: string;
}

@Component({
  selector: "app-citas-probador",
  templateUrl: "./citas-probador.view.html",
  styleUrls: ["./citas-probador.view.scss"],
})
export class CitasProbadorView implements OnInit {
  productosRenta: DressItem[] = [];
  productosVenta: DressItem[] = [];
  tipoCompra: string = "renta";
  totalCompra: number = 0;
  isLoggedIn: boolean = false;
  name: string = "";
  lastName: string = "";
  email: string = "";
  selectedProductoRenta: DressItem | null = null;
  selectedProductoVenta: DressItem | null = null;

  constructor(private indexedDbService: IndexedDbService, private router: Router) {}

  async ngOnInit() {
    try {
      const productos = await this.indexedDbService.obtenerProductosApartados();
      this.productosRenta = productos.filter((item) => item.categoria === "renta");
      this.productosVenta = productos.filter((item) => item.categoria === "venta");
      this.calcularTotal();
      this.initializeTabs();
    } catch (error) {
      console.error("Error al obtener productos apartados:", error);
    }
  }

  private initializeTabs() {
    if (typeof $ !== "undefined") {
      $(".menu .item").tab();
    } else {
      console.error("jQuery no está disponible.");
    }
  }

  async deleteDressItem(id: string) {
    try {
      await this.indexedDbService.eliminarProducto(id);
      this.productosRenta = this.productosRenta.filter((item) => item.id !== id);
      this.productosVenta = this.productosVenta.filter((item) => item.id !== id);
      this.calcularTotal();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
    }
  }

  setTipoCompra(tipo: string) {
    this.tipoCompra = tipo;
    this.calcularTotal();
  }

  calcularTotal() {
    this.totalCompra = this.tipoCompra === "renta"
      ? this.productosRenta.reduce((total, item) => total + item.precio, 0)
      : this.productosVenta.reduce((total, item) => total + item.precio, 0);
  }

  login() {
    this.isLoggedIn = true;
    this.name = "Juan";
    this.lastName = "Pérez";
    this.email = "juan.perez@example.com";
  }

  continuarCompra(): void {
    if (this.tipoCompra === "renta" && this.selectedProductoRenta) {
      this.router.navigate(["/checkout"], { queryParams: { id: this.selectedProductoRenta.id, tipo: this.tipoCompra } });
    } else if (this.tipoCompra === "venta" && this.selectedProductoVenta) {
      this.router.navigate(["/checkout"], { queryParams: { id: this.selectedProductoVenta.id, tipo: this.tipoCompra } });
    }
  }
}
