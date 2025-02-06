import { Component } from "@angular/core";
import { animate, style, transition, trigger } from "@angular/animations";

@Component({
  selector: "app-hero-img",
  animations: [
    trigger("fadeIn", [
      transition(":enter", [
        style({ opacity: 0 }),
        animate("300ms ease-in", style({ opacity: 1 })),
      ]),
      transition(":leave", [
        animate("300ms ease-out", style({ opacity: 0 })),
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
    </div>
   
  `,
  styles: `
  .hero {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50vh;
    background-image: url("https://res.cloudinary.com/dvvhnrvav/image/upload/v1736990456/images-AR/gh5ryrsad5fnaxgjgall.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-color: rgb(255, 237, 237);
    background-attachment: fixed;
    mask-image: linear-gradient(black 90%, transparent);
    padding: 0 2rem;
  }

  .hero-content {
    width: 55%;
    color: rgb(255, 0, 179);
    text-align: center;
    padding: 7rem;
  }

  .title {
    font-size: 6.5rem;
    font-weight: 999;
    font-family: innerti;
    margin-bottom: 1rem;
    text-shadow: 0px 0px 9px rgba(255, 133, 214, 0.8),
                 0px 0px 15px rgba(255, 167, 226, 0.6);
    position: relative;
    transition: transform 0.8s ease-out, opacity 0.8s ease-out;
  }

  /* Efecto de alejamiento con el scroll */
  @media (prefers-reduced-motion: no-preference) {
    .title {
      will-change: transform, opacity;
    }

    .title.shrink {
      transform: translateY(-150px) scale(0.6);
      opacity: 0;
    }
  }

  .subtitle {
    font-size: 1.2rem;
    margin-bottom: 1rem;
  }

  .description {
    font-size: 1rem;
    line-height: 1.5;
    margin-bottom: 2rem;
    color: #000000;
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

  .content {
    text-align: center;
    padding: 2rem;
  }

  /* Aplicar la animación con scroll usando Scroll-Driven Animations */
  @supports (animation-timeline: scroll()) {
    .title {
      animation: fadeMove linear both;
      animation-timeline: scroll();
      animation-range: 0px 250px;
    }

    @keyframes fadeMove {
      to {
        transform: translateY(-150px) scale(0.6);
        opacity: 0;
      }
    }
  }
  `,
})
export class HeroImgComponent {}
