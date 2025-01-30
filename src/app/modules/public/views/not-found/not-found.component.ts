import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styles: `
  .error-container {
  position: relative; /* Para posicionar la imagen y el contenido */
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden; /* Oculta cualquier desbordamiento */
}

.overlay {
  position: absolute; /* Posiciona el texto encima de la imagen */
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%); /* Centra el contenido */
  text-align: center; /* Centra el texto */
  z-index: 10; /* Asegura que el texto esté encima */
}

.error-title {
  font-size: 11em;
  font-weight: bold;
  color: rgb(255, 255, 255);
  line-height: 1;
  -webkit-text-stroke: 1px rgb(255, 235, 245);
  text-stroke: 1px black;
  margin-bottom: 20px;

  text-shadow: 0px 0px 9px rgba(255, 133, 214, 0.8), 0px 0px 15px rgba(255, 167, 226, 0.6);

}

.error-subtitle {
  font-size: 16px;
  color: rgba(255, 255, 255, 0.78);
  margin: 20px 0;
  font-family: "Poppins", Arial, Helvetica, sans-serif;
  text-shadow: 0px 0px 9px rgba(255, 133, 214, 0.8), 0px 0px 15px rgba(255, 167, 226, 0.6);


}

.back-button {
  background: linear-gradient(135deg, #9d50bb, #6e48aa);
  color: black;
  padding: 15px 40px;
  font-size: 1.2em;
  border-radius: 50px;
  border: none;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: all 0.3s ease-in-out;
}

.back-button:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 10px rgba(0, 0, 0, 0.3);
}

.image-container {
  position: absolute; /* Asegura que la imagen cubra todo el contenedor */
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1; /* Asegura que la imagen esté detrás del texto */
}

.error-image {
  width: 100%; /* Asegura que la imagen cubra todo el contenedor */
  height: 100%; /* Asegura que la imagen cubra todo el contenedor */
  object-fit: cover; /* Mantiene la relación de aspecto y cubre el área */
  filter: drop-shadow(20px 20px 20px rgb(255, 255, 255));
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
