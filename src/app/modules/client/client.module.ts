import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientRoutingModule } from './client-routing.module';
import { PerfilComponent } from './views/cuenta/perfil/perfil.component';
import { RentasComponent } from './views/cuenta/rentas/rentas.component';
import { ClientComponent } from './client.component';
import { SessionService } from '../../shared/services/session.service';
import { VentayrentaService } from '../../shared/services/ventayrenta.service';
import { ComprasComponent } from './views/cuenta/compras/compras.component';
import { FormsModule } from '@angular/forms';
import { StorageService } from '../../shared/services/storage.service';
import { UsuarioService } from '../../shared/services/usuario.service';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { HeaderModule } from '../../shared/components/header/header.module';
import { NotificacionesComponent } from './views/cuenta/notificaciones/notificaciones.component';
import { DatosEmpresaService } from '../../shared/services/datos-empresa.service';


@NgModule({
  declarations: [
    PerfilComponent,
    RentasComponent,
    ComprasComponent,
    ClientComponent,
    NotificacionesComponent,
  ],
  imports: [HeaderModule, 
    CommonModule,  ButtonModule,AvatarModule,AvatarGroupModule,
    ClientRoutingModule,FormsModule
  ]
  ,providers: [DatosEmpresaService,
    SessionService,UsuarioService,StorageService,
    VentayrentaService,provideClientHydration(), [provideHttpClient(withFetch())]
    
  ],
})
export class ClientModule { }
