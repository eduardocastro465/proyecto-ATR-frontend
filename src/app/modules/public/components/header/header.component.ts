import {
  Component,
  HostListener,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
  AfterViewInit,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  signal,
  Input,
  SimpleChanges,
  OnChanges,
  computed,
} from "@angular/core";
import { Router } from "@angular/router";
import { MenuItem, MenuItemCommandEvent, MessageService } from "primeng/api";
import { isPlatformBrowser } from "@angular/common";
import { SessionService } from "../../../../shared/services/session.service";
import { ERol } from "../../../../shared/constants/rol.enum";
import { DatosEmpresaService } from "../../../../shared/services/datos-empresa.service";
import { ThemeServiceService } from "../../../../shared/services/theme-service.service";
import { IndexedDbService } from "../../commons/services/indexed-db.service";
declare const $: any;

export interface DressItem {
  id: string;
  nombre: string;
  precio: number;
  imagenPrincipal: string;
}

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: [
    "./header.component.scss"
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements OnInit, AfterViewInit, OnChanges {
  isScrolled = false;
  sidebarVisible = false;
  @Input() isMobile = false;
  items: MenuItem[] = [];
  isLoggedIn = false;
  // Señal para manejar el contador
  // dressItemCount = signal(0);
  userROL!: string;
  isSticky = false;
  searchQuery = ""; // Bind search input
  datosEmpresa: any = {};
  nombreDeLaPagina: string = "";
  dressItems: any[] = [];
  // Señal para manejar reactividad
  private dressItemsSignal = signal<any[]>([]);
  // Señal computada para el contador
  dressItemCount = computed(() => this.dressItemsSignal().length);
  empresaData: any;

  imageUrl!: string;
  defaultImageUrl: string =
    "https://res.cloudinary.com/dvvhnrvav/image/upload/v1730395938/images-AR/wyicw2mh3xxocscx0diz.png";
  isDarkThemeOn = signal(false);
  
  darkMode = false;
  constructor(
    private indexedDbService: IndexedDbService,

    private sessionService: SessionService,
    private datosEmpresaService: DatosEmpresaService,
    private elementRef: ElementRef,
    public themeService: ThemeServiceService,
    
    private router: Router,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    

    // this.isLoading = false;

  }


  isModalVisible: boolean = false;

  openModal() {
    this.isModalVisible = true;
  }

  cerrarModal(valor: boolean): void {
    this.isModalVisible = valor; // Oculta el modal
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes["mostrarFormulario"]) {
      const newVluesmostrarFormulario = changes["mostrarFormulario"].currentValue;
  this.isModalVisible = newVluesmostrarFormulario; // Actualizamos el valor para cerrar el modal
     
      console.log("mostrarFormulario  en listado producto cambió a:", newVluesmostrarFormulario);
    }
    if (changes["isMobile"]) {
      this.onMobileChange(changes["isMobile"].currentValue);
    }

    this.dressItemsSignal.set(this.dressItems); // Actualiza la señal correctamente
    
    // Aquí puedes agregar lógica adicional si es necesario
  }
  // closeModal() {
  //   this.visible = false; // Cierra el modal
  //   this.loginForm.reset(); // Limpia los campos del formulario
  //   this.robot = false;
  //   this.presionado = false;
  //   this.captchaToken = null; // Limpia el token del captcha
  // }
  // toggleDarkTheme(): void {
  //   document.body.classList.toggle('dark-theme');
  // }

  // toggleTheme() {
  //   document.body.classList.toggle("dark-theme");
  //   this.isDarkThemeOn.update((isDarkThemeOn) => !isDarkThemeOn);
  //   this.darkMode = !this.darkMode;
  //   if (typeof document !== "undefined") {
  //     document.documentElement.setAttribute(
  //       "data-theme",
  //       this.darkMode ? "dark" : "light"
  //     );
  //   }
  //   //
  //   const newTheme =
  //     this.themeService.getTheme() === "light" ? "dark" : "light";

  //   // Guardar el tema en localStorage
  //   localStorage.setItem("theme", newTheme);
  //   this.themeService.setTheme(newTheme);
  // }

  async ngOnInit() {
    try {
      const productos = await this.indexedDbService.obtenerProductosApartados();
      this.dressItems = Array.isArray(productos) ? productos : [productos];
      // console.log(this.dressItems);
    } catch (error) {
      console.error("Error al obtener productos apartados:", error);
    }
  }
  onMobileChange(isMobile: boolean) {
    // Aquí puedes poner la lógica que quieres ejecutar cuando cambia isMobile
    console.log("isMobile changed:", isMobile);
    // Por ejemplo, podrías llamar a updateMenuItems() aquí si es necesario
    this.updateMenuItems();
  }

  //
  // loadCompanyData() {
  //   this.datosEmpresaService.traerDatosEmpresa().subscribe(
  //     (data) => {
  //       this.empresaData = data[0]; // Guardar los datos en la variable
  //       this.nombreDeLaPagina = this.empresaData?.tituloPagina;
  //       this.imageUrl = this.empresaData?.logo;
  //     },
  //     (error) => {
  //       console.error("Error al cargar los datos de la empresa:", error);
  //     }
  //   );
  // }

  
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {
      $(this.elementRef.nativeElement)
        .find(".ui.search")
        .search({
          type: "category",
     
          onSelect: (result: any) => {
            // Manejar la selección del resultado aquí, si es necesario
          },
        });
    }
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    this.isSticky = scrollTop > 10;
    this.isScrolled = scrollTop > 10;
  }

  isLoading = false;

  onSearch() {
    this.isLoading = true;
    // Reemplaza con la llamada real a la API de búsqueda
    setTimeout(() => {
      this.isLoading = false;
      this.router.navigate(['/public/search', this.searchQuery])   
   
      // Implementa tu lógica de búsqueda aquí
      console.log("Buscando:", this.searchQuery);
    }, 2000);
  }

  showDialog() {
    this.sidebarVisible = true;
  }
  popupVisible: boolean = false;

  // Alterna la visibilidad del popup
  togglePopup() {
    this.popupVisible = !this.popupVisible;
  }

  @HostListener("document:click", ["$event"])
  onClickOutside(event: Event) {
    const clickedInside = this.elementRef.nativeElement.contains(event.target);
    if (!clickedInside) {
      this.popupVisible = false;
    }
  }

  updateMenuItems() {
    this.isLoggedIn = this.isUserLoggedIn();

    // Asigna items de menú con el tipo correcto
    this.items = this.isLoggedIn
      ? [
          {
            label: "Mi perfil",
            icon: "pi pi-user",
            command: (event: MenuItemCommandEvent) =>
              this.redirectTo("Mi-perfil"),
          },
          {
            label: "Configuración",
            icon: "pi pi-cog",
            command: (event: MenuItemCommandEvent) => this.redirectTo("Config"),
          },
          {
            label: "Cerrar sesión",
            icon: "pi pi-sign-out",
            command: (event: MenuItemCommandEvent) => this.logout(),
          },
        ]
      : [
          {
            label: "Iniciar sesión",
            icon: "pi pi-sign-in",
            command: (event: MenuItemCommandEvent) =>
              this.redirectTo("Sign-in"),
          },
          {
            label: "Registrarme",
            icon: "pi pi-user-plus",
            command: (event: MenuItemCommandEvent) =>
              this.redirectTo("Sign-up"),
          },
          {
            label: "Activar cuenta",
            icon: "pi pi-check-circle",
            command: (event: MenuItemCommandEvent) =>
              this.redirectTo("Activar-cuenta"),
          },
        ];
  }

  logout() {
    localStorage.removeItem("token");
    this.isLoggedIn = false;
    this.updateMenuItems();
    this.router.navigate(["/auth/login"]);
  }

  isUserLoggedIn(): boolean {
    const userData = this.sessionService.getUserData();
    if (userData) {
      this.userROL = userData.rol;
      return this.userROL === ERol.CLIENTE;
    }
    return false;
  }

  redirectTo(route: string): void {
    this.sidebarVisible = false;
    this.isModalVisible = false;
    this.router.navigate(
      route.includes("Sign-in") ||
        route.includes("Sign-up") ||
        route.includes("forgot-password") ||
        route.includes("Activar-cuenta")
        ? ["/auth", route]
        : ["/public", route]
    );
  }
}
