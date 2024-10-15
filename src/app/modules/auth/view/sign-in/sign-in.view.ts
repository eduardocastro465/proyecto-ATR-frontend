import { Component, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SignInService } from '../../commons/services/sign-in.service';
import { StorageService } from '../../../../shared/services/storage.service';
import { SessionService } from '../../../../shared/services/session.service';
import { ERol } from "../../../../shared/constants/rol.enum";

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.view.html',
  styleUrls: ['./sign-in.view.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class SignInView {
  loginForm: FormGroup;
  errorMessage!: string;
  userROL!: string;
  loading:boolean=false;

  constructor(
    private signInService: SignInService,
    private storageService: StorageService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ["", Validators.required],
      password1: ["", Validators.required],
    });
  }

  redirectTo(route: string): void {
    if (route === 'login') {
      this.router.navigate(['/auth/login']);
    } else {
      this.router.navigate(['/auth', route]);
    }
  }

  login(): void {
    this.loading=true
    if (this.loginForm.invalid) {
      Swal.fire({
        title: "Campos incompletos",
        text: "Por favor, completa todos los campos",
        icon: "warning",
        confirmButtonText: "Entendido",
      });
    this.loading=true

      return;
    }

    if (!navigator.onLine) {
      Swal.fire({
        title: "Sin conexión a Internet",
        text: "Por favor, verifica tu conexión y vuelve a intentarlo.",
        icon: "error",
        confirmButtonText: "Ok",
      });
    this.loading=false

      return;
    }


    const email = this.loginForm.value.email;
    const password1 = this.loginForm.value.password1;
    this.loading=true

    this.signInService
    .signIn({ email, password1 })
    .subscribe(
      (response) => {
          console.log("aqui")
          if (response) {
            this.storageService.setToken(response.token);
            const userData = this.sessionService.getUserData();
            if (userData) {
              this.userROL = userData.rol;
              let navigateTo = "";

              if (this.userROL === ERol.ADMIN) {
                navigateTo = "admin/inicio";
              } else if (this.userROL === ERol.ADMPRF) {
                navigateTo = "purificadoraAdm/Home";
              } else if (this.userROL === ERol.REPARTIDOR) {
                navigateTo = "repartidor/Home";
              }

              this.router.navigate([navigateTo]).then(() => {
                if (navigateTo === "repartidor/Home") {
                  window.location.reload();
                } else {
                  Swal.fire({
                    title: "Acceso exitoso",
                    text: "Has iniciado sesión correctamente.",
                    icon: "success",
                    confirmButtonText: "Continuar",
                  });
                }
              });
            }
          }
        },
        (err) => {
          Swal.fire({
            title: "Error!",
            text: "Ocurrió un error al iniciar sesión.",
            icon: "error",
            confirmButtonText: "Ok",
          });
        }
      );
  }
}
