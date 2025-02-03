import { Component, OnInit } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { RouterOutlet } from "@angular/router";
import { NgxUiLoaderModule, NgxUiLoaderService } from "ngx-ui-loader";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-root",
  standalone: true,
  imports: [
    RouterOutlet,
    NgxUiLoaderModule,
    CommonModule,
  ],
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  constructor(private ngxService: NgxUiLoaderService) {}

  ngOnInit() {
    // Verificar si sessionStorage está disponible
    if (typeof sessionStorage !== "undefined") {
      if (!sessionStorage.getItem("firstSession")) {
        this.ngxService.start(); // Inicia el loader
        setTimeout(() => {
          this.ngxService.stop(); // Detiene el loader después de 1 segundo
          sessionStorage.setItem("firstSession", "true"); // Guarda en sessionStorage
        }, 1000);
      }
    } else {
      console.warn("sessionStorage no está disponible en este entorno.");
    }
  }
  
}
