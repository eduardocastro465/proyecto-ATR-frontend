import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  HostListener,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
// import * as AOS from 'aos';
import { SessionService } from '../../../../shared/services/session.service';
import { ERol } from '../../../../shared/constants/rol.enum';
import { DatosEmpresaService } from '../../../../shared/services/datos-empresa.service';
import { response } from 'express';
import { error } from 'console';
import { ProductoService } from '../../../../shared/services/producto.service';
import { IndexedDbService } from '../../commons/services/indexed-db.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.view.html',
  styleUrls: [
    './home.view.css',
    // '../../../../shared/styles/categoriesNav.scss',
    '../../../../shared/styles/styles.scss',
    '../../../../shared/styles/animations.scss',
  ],
})
export class HomeView implements OnInit {
  isMobile: boolean = false;
  visible: boolean = false;
  userROL!: string;
  position: any = 'bottom-left';
  productosPaginados: any = [];
  rows = 7; // Número de elementos por página
  // datosEmpresa: any = {};

  productos: any;
  responsiveOptions = [
    {
      breakpoint: '1024px',
      numVisible: 3,
      numScroll: 1
    },
    {
      breakpoint: '768px',
      numVisible: 2,
      numScroll: 1
    },
    {
      breakpoint: '500px',
      numVisible: 0.5, // Mostrar la mitad del último producto
      numScroll: 1
    }
  ];

  constructor(
    private indexedDbService: IndexedDbService,
    private router: Router,
    private sessionService: SessionService,
    private datosEmpresaService: DatosEmpresaService,
    private PRODUCTOSERVICE_: ProductoService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  // checkScreenSize() {
  //   if (isPlatformBrowser(this.platformId)) {
  //     this.isMobile = window.innerWidth <= 768; // Determina si es móvil o escritorio
  //     this.applyHeroImageVisibility();
  //     console.log(this.isMobile ? 'Modo móvil' : 'Modo escritorio');
  //   }
  // }
  // applyHeroImageVisibility() {
  //   const heroImageElement = document.querySelector('.hero-img');
  //   if (heroImageElement) {
  //     if (this.isMobile) {
  //       heroImageElement.classList.add('hide-hero-img'); // Oculta en móviles
  //     } else {
  //       heroImageElement.classList.remove('hide-hero-img'); // Muestra en pantallas grandes
  //     }
  //   }
  // }
  private detectDevice() {
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent;
      console.log(ua);
      this.isMobile = window.innerWidth <= 600;
    }
  }
  
  
  @HostListener('window:resize', ['$event'])
  onResize() {
    this.detectDevice();
  }
  @HostListener('window:beforeunload', ['$event'])
  onBeforeUnload(event: Event) {
    console.log('⏳ La página se está recargando...');
    // Puedes guardar datos en localStorage o mostrar un mensaje
  }


  isLoading = true;

  @HostListener('window:load')
  onLoad() {
    setTimeout(() => {
      this.isLoading = false; // Ocultar skeleton cuando la página se cargue
    }, 2000); // Simular una carga de 2 segundos
  }
  ngOnInit() {
    //
    this.getDatos();
    // ngOnInit() {
    // this.productosPaginados = this.productos.slice(0, this.rows);
    // }
    if (performance?.navigation?.type === 1) {
      console.log('🔄 La página se ha recargado');
    }

    this.visible = true;
    // if (typeof window !== 'undefined') {
    //   this.position = 'bottom-left';
    // }
    // if (isPlatformBrowser(this.platformId)) {
    //   AOS.init(); // Inicializa AOS solo si está en el navegador
    // }
    this.detectDevice();
    // Asigna items de menú con el tipo correcto
    // this.items = this.isLoggedIn

    const ua = navigator.userAgent;
    console.log(ua);

    // Verificar si estamos en un entorno del navegador (donde window existe)
    if (typeof window !== 'undefined') {
      const ua = navigator.userAgent;
      console.log(ua);

      // Detectar si la ventana tiene un tamaño similar al de un móvil
      if (window.innerWidth <= 768) {
        this.isMobile = true;
        console.log('El navegador está en un tamaño de móvil');
      } else {
        this.isMobile = false;
        console.log('El navegador está en un tamaño de escritorio');
      }

      // Detectar si el navegador es Chrome
      if (/Chrome/i.test(ua)) {
        console.log('Navegador Chrome detectado');
      } else {
        console.log('Navegador no es Chrome');
      }

      // Escuchar cambios en el tamaño de la ventana
      window.addEventListener('resize', () => {
        if (window.innerWidth <= 600) {
          this.isMobile = true;
          console.log('El navegador ahora está en un tamaño de móvil');
        } else {
          this.isMobile = false;
          console.log('El navegador ahora está en un tamaño de escritorio');
        }
      });
    } else {
      this.isMobile = false;

      console.log('No se está ejecutando en un navegador');
    }
  }

  getDatos() {
    this.PRODUCTOSERVICE_.obtenerProductos().subscribe((response) => {
      this.productos = response;
      // this.isLoading=false;
    });
  }

  isUserLoggedIn(): boolean {
    const userData = this.sessionService.getUserData();
    if (userData) {
      this.userROL = userData.rol;
      return this.userROL === ERol.CLIENTE;
    }
    // visible = false;

    return false;
  }
  verDetalles(id: number) {
    // this.PRODUCTOSERVICE_.obtenerDetalleProductoById()

    this.router.navigate(['/public/Detail/' + id]);
    // this.router.navigate(['/public/Detail']);
  }

  redirectTo(route: string): void {
    console.log(route);
    if (route === 'Sign-in') {
      this.router.navigate(['/auth/Sign-in']);
    } else {
      console.log('click', route);
      this.router.navigate(['/public', route]);
    }
  }

  // agregarProducto() {
  //   const nuevoProducto = {
  //     id: 5,
  //     nombre: 'Producto 5',
  //     descripcion: 'Descripción del producto 5',
  //     precio: 300,
  //     imagen:
  //       'https://res.cloudinary.com/dvvhnrvav/image/upload/v1726509885/images-AR/mpcff7aljvb00pndcor5.jpg',
  //   };
  //   this.productos.push(nuevoProducto);
  //   // if (isPlatformBrowser(this.platformId)) {
  //   //   AOS.refresh(); // Refresca AOS solo si está en el navegador
  //   // }
  // }

  cambiarPagina(event: any) {
    const start = event.first;
    const end = start + event.rows;
    this.productosPaginados = this.productos.slice(start, end);
  }

  apartarRentar(producto: any) {
    console.log('primero=>', producto); // Log the data being saved
    // guardarProducto(productData);
    const body2 = {
      id: producto._id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagenPrincipal: producto.imagenPrincipal,
    };
    console.log('ssegundo=>', body2); // Log the data being saved

    try {
      this.indexedDbService.guardarProducto(body2);
      // this.dbService.guardarProducto(productData);
    } catch (error) {
      console.error('Error saving product:', error);
    }

    // Agregar producto a la lista de "Apartados" o "Rentados"
  }
}
