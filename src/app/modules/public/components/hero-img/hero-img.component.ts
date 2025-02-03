import { animate, style, transition, trigger } from "@angular/animations";
import { Component } from "@angular/core";

@Component({
  selector: "app-hero-img",
  animations: [
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('300ms ease-in', style({ opacity: 1 })),
      ]),
      transition(':leave', [
        animate('300ms ease-out', style({ opacity: 0 })),
      ]),
    ]),
  ],
  template: `
    <div class="hero">
      <div class="hero-content" @fadeIn>
        <h1 class="title">Venta y Renta</h1>
        <p class="subtitle">Especial de Verano 2024</p>
        <p class="description">
          LO MÁS TOP DE VESTIDOS EN RENTA PARA FIESTAS, UN ESPACIO DONDE
          ENCONTRARÁS LO QUE ESTÁS BUSCANDO ✨.
        </p>
        <a href="#" class="cta">Compra Ahora</a>
      </div>

      <!-- <app-figure></app-figure> -->
    </div>
  `,
  styles: `
 .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
    filter: drop-shadow(10px 10px 15px rgb(249, 192, 255)); /* Efecto de sombra */

    /* Imagen de fondo */
    background-image: url("https://res.cloudinary.com/dvvhnrvav/image/upload/v1736990456/images-AR/gh5ryrsad5fnaxgjgall.jpg");
    // background-image: url("https://res.cloudinary.com/dvvhnrvav/image/upload/v1736788371/ProductosAtelier/hzrxssa8hcyn94b6vylh.png");
    background-size: cover; /* Mantén la imagen contenida en el contenedor */
    background-repeat: no-repeat; /* Evita que la imagen se repita */
    background-position: center; /* Coloca la imagen en la parte inferior y centrada */
    // background-color: white; /* Fondo blanco debajo de la imagen */
    background-color:rgb(255, 237, 237);
    // background: #ffffff;
    // background: -webkit-linear-gradient(0deg, #ffffff 0%, #ffeaea 100%);
    // background-color: linear-gradient(0deg, #ffffff 0%, #ffeaea 100%);
    /* Otras propiedades */
    background-attachment: fixed; /* Efecto Parallax */
    mask-image: linear-gradient(black 90%, transparent);
    padding: 0 2rem;
}




  
  .hero-content {
    width: 55%;
    filter: opacity(8);
    color:rgb(255, 0, 179);
    position: relative;
  z-index: 1;
  /* margin: auto; */
  padding: 7rem;
  /* Agregar un fondo semi-transparente para mejorar la legibilidad */
    // background-color: #000000;
  // color: #fff;
  text-align: center;
    animation: fadeIn 1.5s ease-out;
  }

  .subtitle {
    font-size: 1.2rem;
    // color:#f3f3f3;
    // color:#000000;
    margin-bottom: 1rem;
  }

  .title {
  font-size: 6.5rem;
  font-weight: 999;
  font-family: innerti;
  margin-bottom: 1rem;
  line-height: 1.2;
  text-shadow: 0px 0px 9px rgba(255, 133, 214, 0.8), 0px 0px 15px rgba(255, 167, 226, 0.6);
}

  .description {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 2rem;
    color:#000000;
    // color:#f5f5f5;
  }

  .cta {
    display: inline-block;
    padding: 0.8rem 2rem;
    background: linear-gradient(90deg, #ffcc00, #ffa500);
    color: #000;
    font-weight: bold;
    text-decoration: none;
    border-radius: 50px;
    transition: background-color 0.3s;
  }

  .cta:hover {
    background-color: #e6b800;
  }

  @media (max-width: 767px) {
  .hero {
    border-radius:5px;
    mask-image:none;
    padding: 0;
    height: 30vh;

    .hero-content {
      text-align: center; // Texto centrado
      color: #fff;
      background-color: #ebe3db79;
      padding: 1rem;

      backdrop-filter: blur(3px);

      .subtitle {
        font-size: 1rem;
        margin-bottom: 0rem;
    color:rgb(255, 255, 255);

      }

      .title {
        font-size: 2rem;
        margin-bottom: 0rem;
      }

      .description {
        font-size: 1rem;
    margin-bottom: 0rem;
    color:rgb(255, 255, 255);
      }
      .cta {
        display: inline-block;
        text-decoration: none;
        padding: 0.75rem 1.5rem;
        border-radius: 5px;
        border: none;
        cursor: pointer;
        transition: background-color 0.3s ease;


      }
    }
  }
}
/* Optional: Smooth fade-in effect for content */
@keyframes fadeIn {
0% {
  opacity: 0;
  transform: translateY(20px);
}
100% {
  opacity: 1;
  transform: translateY(0);
}
}`,
})
export class HeroImgComponent {}
