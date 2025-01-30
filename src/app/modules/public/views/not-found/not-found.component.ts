import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: `
 .error-container {
  display: flex;
  flex-direction: column; // Asegura que la imagen esté arriba y el texto abajo
  align-items: center;
  text-align: center;
  padding: 20px;
}

.image-container {
  width: 30%; // Tamaño reducido de la imagen
  // margin-bottom: 10px; // Espacio entre la imagen y el texto
}

.error-image {
  width: 100%;
  height: auto;
}

.overlay {
  max-width: 400px;
}

.error-title {
  font-size: 24px;
  font-weight: bold;
}

.error-subtitle {
  font-size: 16px;
  color: #666;
}

.back-button {
  margin-top: 15px;
  padding: 10px 20px;
}

  `
})
export class NotFoundComponent implements OnInit {

  constructor(private router: Router) {}

  ngOnInit() {
    // Inicialización si es necesario
  }

  goBack() {
    this.router.navigate(['']); // Cambia la ruta según sea necesario
  }
}
