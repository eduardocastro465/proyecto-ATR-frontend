import { Component, OnInit } from "@angular/core";
import { ProductoService } from "../../../../shared/services/producto.service";
import { ActivatedRoute } from "@angular/router";
import { IndexedDbService } from "../../commons/services/indexed-db.service";
// import { Producto } from '../../../../shared/models/Producto.model';

interface Producto {
  id?: string; // Opcional, para incluir el _id de MongoDB
  nombre: string;
  imagenPrincipal: any; // Sigue siendo una cadena para representar la imagen en base64
  otrasImagenes: string[]; // Sigue siendo un array de cadenas para imágenes adicionales en base64
  // categoria: "Ropa" | "Accesorios" | "Calzado" | "Otro";
  color: string;
  textura?: string;
  // tallasDisponibles: Array<{
  //   talla: "XS" | "S" | "M" | "L" | "XL" | "XXL" | "Otro"; // Puede ser una cadena literal
  //   medida: string; // La medida sigue siendo una cadena
  // }>;
  precio: number;
  estado: {
    disponible: boolean;
    tipoVenta: "Venta" | "Renta";
    nuevo?: boolean; // Nuevo es opcional
  };
  descripcion?: string; // Descripción opcional
}

@Component({
  selector: "app-details-product",
  templateUrl: "./details-product.view.html",
  styleUrls: ["./details-product.view.scss", "./info.scss", "./carrucel.scss"],
})
export class DetailsProductView implements OnInit {
  isLoading: boolean = true;
  images: any[] = []; // Change to any[] to hold the required data
  productName: string = "";
  productPrice: string = "";
  productDescription: string = "";
  selectedImageIndex: number = 0; // Track the current index for the Galleria
  sizes: any[] = [];
  selectedColor: string = "";
  selectedSize: string = "";
  // sizes: any[] = [];
  productId!: any;
  Detalles: any = null; // Inicializado en null
  responsiveOptions: any[] = [
    {
      breakpoint: "1024px",
      numVisible: 3,
      numScroll: 3,
    },
    {
      breakpoint: "768px",
      numVisible: 2,
      numScroll: 2,
    },
    {
      breakpoint: "560px",
      numVisible: 1,
      numScroll: 1,
    },
  ];

  constructor(
    private indexedDbService: IndexedDbService,
    private productoS_: ProductoService,
    private activatedRoute: ActivatedRoute
  ) {
    // this.id=require.para
  }
  ngOnInit() {
    this.scrollToTop();
    this.productId = this.activatedRoute.snapshot.params["id"];
    this.productoS_
      .obtenerDetalleProductoById(this.productId)
      .subscribe((response) => {
        this.Detalles = response;
      });

  }
 scrollToTop() {
    window.scrollTo(0, 0); // Esto lleva la página a la parte superior
}

  // getProductDetails() {
  //   this.isLoading = true;
  // }

  // selectedImageIndex = 0; // Índice inicial de la imagen

  prevImage() {
    this.selectedImageIndex =
      (this.selectedImageIndex - 1 + this.images.length) % this.images.length;
  }
  nextImage() {
    this.selectedImageIndex =
      (this.selectedImageIndex + 1) % this.images.length;
  }

  onImageChange(event: any) {
    this.selectedImageIndex = event.index;
  }

  // Imagen principal del Detalles

  // // Lista de imágenes en miniatura
  thumbnailImages!: string[];
  changeMainImage(image: string) {
    // this.mainImage = image;
  }

  apartarRentar(producto: any) {
    console.log("primero=>", producto); // Log the data being saved
    // guardarProducto(productData);
    const body2 = {
      id: producto._id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagenPrincipal: producto.imagenPrincipal,
    };
    console.log("ssegundo=>", body2); // Log the data being saved

    try {
      this.indexedDbService.guardarProducto(body2);
      // this.dbService.guardarProducto(productData);
    } catch (error) {
      console.error("Error saving product:", error);
    }

    // Agregar producto a la lista de "Apartados" o "Rentados"
  }

  productos = [
    {
      nombre: "Diadema Elegante",
      precio: 15,
      imagen:
        "https://img.ltwebstatic.com/images3_spmp/2024/09/05/c4/17254703255ca6e5d5659688c66976ff7fcca3f6ca_thumbnail_720x.jpg",
    },
    {
      nombre: "Collar de Perlas",
      precio: 25,
      imagen:
        "https://img.ltwebstatic.com/images3_spmp/2024/09/05/c4/17254703255ca6e5d5659688c66976ff7fcca3f6ca_thumbnail_720x.jpg",
    },
    {
      nombre: "Pulsera Brillante",
      precio: 10,
      imagen:
        "https://img.ltwebstatic.com/images3_spmp/2024/09/05/c4/17254703255ca6e5d5659688c66976ff7fcca3f6ca_thumbnail_720x.jpg",
    },
    {
      nombre: "Renta de Vestido",
      precio: 50,
      imagen:
        "https://img.ltwebstatic.com/images3_spmp/2024/09/05/c4/17254703255ca6e5d5659688c66976ff7fcca3f6ca_thumbnail_720x.jpg",
    },
  ];

  productosRelacionados = [
    {
      nombre: "vestido pulpa",
      precio: 30,
      imagen: "https://m.media-amazon.com/images/I/61kC5lqiJOL._AC_SX569_.jpg",
    },
    {
      nombre: "vestido 2",
      precio: 40,
      imagen: "https://m.media-amazon.com/images/I/61kC5lqiJOL._AC_SX569_.jpg",
    },
    {
      nombre: "vestido 3",
      precio: 20,
      imagen: "https://m.media-amazon.com/images/I/61kC5lqiJOL._AC_SX569_.jpg",
    },
    {
      nombre: "vestido 3",
      precio: 20,
      imagen: "https://m.media-amazon.com/images/I/61kC5lqiJOL._AC_SX569_.jpg",
    },
  ];
}
