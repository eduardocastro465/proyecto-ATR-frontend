import { Component, OnInit } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { NgxUiLoaderModule, NgxUiLoaderService } from "ngx-ui-loader";
import { CommonModule } from "@angular/common";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ApiInterceptor } from "./shared/services/api-interceptor.service";
import { SessionService } from "./shared/services/session.service";
import { ERol } from "./shared/constants/rol.enum";
// Importa PrimeNG Dialog y Button
import { DialogModule } from "primeng/dialog";
import { ButtonModule } from "primeng/button";
import { SwPush } from "@angular/service-worker";
import { environment } from "../environments/environment";
@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    NgxUiLoaderModule,
    CommonModule,
    DialogModule, // ✅ Importación del Dialog de PrimeNG
    ButtonModule, // ✅ Importación de los Botones de PrimeNG
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiInterceptor,
      multi: true,
    },
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
})
export class AppComponent implements OnInit {
  showWelcomeMessage = false;
  userROL: string = "";

  publicKey: string = environment.publicKey; // Este es el valor que debes obtener en la consola de Firebase.

  constructor(
    private swPush: SwPush,
    private ngxService: NgxUiLoaderService,
    private sessionService: SessionService
  ) {
    this.notificar();
  }
  notificar() {
    this.swPush
      .requestSubscription({ serverPublicKey: this.publicKey })
      .then((sub) => {
        const token = JSON.parse(JSON.stringify(sub));
        console.log("JSON+++++++++");
      });
  }

  ngOnInit() {
    this.showWelcomeMessage = this.isUserLoggedIn();
    if (typeof sessionStorage !== "undefined") {
      if (!sessionStorage.getItem("firstSession") && !this.isUserLoggedIn()) {
        this.ngxService.start();

        setTimeout(() => {
          this.ngxService.stop();
          sessionStorage.setItem("firstSession", "true");
        }, 1000);
      }
    } else {
      console.warn("sessionStorage no está disponible en este entorno.");
    }
  }

  isUserLoggedIn(): boolean {
    const userData = this.sessionService.getUserData();
    if (userData) {
      this.userROL = userData.rol;
      // this.showWelcomeMessage = false;
      return this.userROL === ERol.CLIENTE;
    }
    // this.showWelcomeMessage = true;
    return false;
  }

  sincronizarCuenta() {
    console.log("Sincronizando cuenta...");
    this.showWelcomeMessage = false;
  }

  cerrarMensaje() {
    this.showWelcomeMessage = false;
  }

  // notificacion push
}
