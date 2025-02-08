import { HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { PublicRoutingModule } from './public-routing.module';
import { PublicComponent } from './public.component';
import { HomeView } from './views/home/home.view';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { SidebarModule } from 'primeng/sidebar';
import { AcercaDeView } from './views/acerca-de/acerca-de.view';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { PerfilView } from './views/perfil/perfil.view';
import { MenuModule } from 'primeng/menu';
import { CheckboxModule } from 'primeng/checkbox';
import { DetailsProductView } from './views/details-product/details-product.view';
import { SkeletonModule } from 'primeng/skeleton';
import { CarritoView } from './views/carrito/carrito.view';
import { DatosEmpresaService } from '../../shared/services/datos-empresa.service';
import {  ControlAdministrativaService} from "../../shared/services/control-administrativa.service";
import { TabMenuModule } from 'primeng/tabmenu';
import { GalleriaModule } from 'primeng/galleria';
import { OverlayPanelModule } from 'primeng/overlaypanel';
import { Toast, ToastrService } from 'ngx-toastr';
import { ConfirmationService, MessageService } from 'primeng/api';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { provideClientHydration } from '@angular/platform-browser';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { SignUpService } from '../auth/commons/services/sign-up.service';
import { UsuarioService } from '../../shared/services/usuario.service';
import { TagComponent } from './components/tag/tag.component';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { PaginatorModule } from 'primeng/paginator';
import { ThemeServiceService } from '../../shared/services/theme-service.service';
import { ProductoService } from '../../shared/services/producto.service';
import { InputGroupModule } from 'primeng/inputgroup';
import { SessionService } from '../../shared/services/session.service';
import { mensageservice } from '../../shared/services/mensage.service';
import { SignInService } from '../auth/commons/services/sign-in.service';
import { PasswordModule } from 'primeng/password';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { PoliticasComponent } from './views/politicas/politicas.component';
import { TerminosComponent } from './views/terminos/terminos.component';
import { CitasProbadorView } from './views/citas-probador/citas-probador.view';
import { ResultsComponent } from './views/results/results.component';
import { HeroImgComponent } from './components/hero-img/hero-img.component';
import { IndexedDbService } from './commons/services/indexed-db.service';
import { FigureComponent } from './components/figure/figure.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { NotFoundComponent } from './views/not-found/not-found.component';
import { Error500Component } from './views/error500/error500.component';
import { SidevarComponent } from './components/sidevar/sidevar.component';
import { CargaComponent } from './components/carga/carga.component';
// import { Header404Component } from './components/header-404/header-404.component';
import {  CarouselModule } from 'primeng/carousel';
import { LoginModalComponent } from './views/login-modal/login-modal.component';
import { VideosComponent } from './components/videos/videos.component';
const MATERIALS =[PasswordModule,
  InputMaskModule,
  InputTextModule,FormsModule,InputGroupModule,AvatarModule,AvatarGroupModule,PaginatorModule,OverlayPanelModule,TieredMenuModule,SkeletonModule,CardModule,TabMenuModule,ButtonModule,DialogModule,SidebarModule,CheckboxModule,MenuModule]
const COMPONENTS =[FooterComponent,HeaderComponent]
const VIEWS=[HomeView,PublicComponent,PerfilView, AcercaDeView,DetailsProductView,LoginModalComponent]
@NgModule({
  declarations: [VIEWS,COMPONENTS, CarritoView, TagComponent, PoliticasComponent, TerminosComponent, CitasProbadorView, ResultsComponent, HeroImgComponent, FigureComponent, BreadcrumbComponent, NotFoundComponent, Error500Component, SidevarComponent, CargaComponent, VideosComponent],
  exports:[COMPONENTS],
  imports: [GalleriaModule,CarouselModule,
    CommonModule,ReactiveFormsModule,FormsModule,
    PublicRoutingModule,HttpClientModule, ...MATERIALS,
  ], schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Toast,MessageService,provideClientHydration(), [provideHttpClient(withFetch())],
  SessionService,
  mensageservice,
  UsuarioService,
  ToastrService,
  MessageService,IndexedDbService,
  ConfirmationService,SignInService,
  SignUpService,ProductoService,UsuarioService,DatosEmpresaService,ControlAdministrativaService,ThemeServiceService],
})
export class PublicModule {


 }
