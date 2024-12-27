import { Component } from '@angular/core';

@Component({
  selector: 'app-hero-img',
  template: `
    <div class="hero">
      <div class="hero-content">
        <p class="subtitle">Especial de Verano 2024</p>
        <h1 class="title">La Mejor Compra de Moda en Línea</h1>
        <p class="description">
          LO MÁS TOP DE VESTIDOS EN RENTA PARA FIESTAS, UN ESPACIO DONDE
          ENCONTRARÁS LO QUE ESTÁS BUSCANDO ✨.
        </p>
        <a href="#" class="cta">Compra Ahora</a>
      </div>
    </div>
  `,
  styles: `
    .hero {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    height: 44vh;
    background-image: url("https://res.cloudinary.com/dvvhnrvav/image/upload/v1730134285/images-AR/ztq3dpdi1uptc9xxwnjo.jpg");
    background-size: cover;
    // background-size: 100% auto; // Ajusta el tamaño de la imagen
    background-position: 0 56%;
    background-attachment: fixed; /* Parallax effect */

  // filter: none;
  // background-image: url("https://res.cloudinary.com/dfd0b4jhf/image/upload/v1709327171/public__/m2z2hvzekjw0xrmjnji4.jpg");
  mask-image: linear-gradient(black  71%, transparent);
    padding: 0 2rem;
  }

  .hero-content {
    max-width: 500px;
    color: #fff;
    position: relative;
  z-index: 1;
  /* margin: auto; */
  padding: 2rem;
  color: #fff;
  text-align: left;
    animation: fadeIn 1.5s ease-out;
  }

  .subtitle {
    font-size: 1.2rem;
    color: #d1d1d1;
    margin-bottom: 1rem;
  }

  .title {
    font-size: 3rem;
    font-weight: bold;
    margin-bottom: 1rem;
    line-height: 1.2;
  }

  .description {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 2rem;
    color: #dcdcdc;
  }

  .cta {
    display: inline-block;
    padding: 0.8rem 2rem;
    background-color: #ffcc00;
    color: #000;
    font-weight: bold;
    text-decoration: none;
    border-radius: 5px;
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
