import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
  ValidatorFn,
} from '@angular/forms';
import { mensageservice } from '../../../../shared/services/mensage.service';
import Swal from 'sweetalert2';
import { SessionService } from '../../../../shared/services/session.service';
import { UsuarioService } from '../../../../shared/services/usuario.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgxUiLoaderService } from 'ngx-ui-loader'; // Import NgxUiLoaderService
import {
  parsePhoneNumberFromString,
  isValidPhoneNumber,
} from 'libphonenumber-js';
import axios from 'axios';
// import { AngularFireAuth } from '@angular/fire/compat/auth';

declare const $: any;

@Component({
  selector: 'app-registro',
  templateUrl: './registro.view.html',
  styleUrls: [
    './registro.view.scss',
    '../../../../shared/styles/notificaciones.scss',
  ],
})
export class RegistroView {
  currentStep = 1;
  passwordStrengthClass: string = ''; // Clase CSS que se aplica dinámicamente
  passwordStrengthMessage: string = ''; // Mensaje dinámico que se muestra debajo del campo
  faltantes: string[] = []; // Lista de requisitos faltantes

  verificationCode: string = '';
  remainingChars: number = 15;
  emailError: string | null = null;
  passwordStrength: string = ''; // variable para almacenar la fuerza de la contraseña
  personalDataForm: FormGroup;
  credentialsForm: FormGroup;
  otpForm: FormGroup; // Para Gmail
  otpWhatsappForm: FormGroup; // Nuevo para WhatsApp

  displayModal: boolean = false;
  isLoadingBasic: boolean = false;
  displayCode: boolean = false;
  displayGmailModal: boolean = false;
  displaySmsModal: boolean = false;
  displayWhatsappModal: boolean = false;
  // .t: string | null = null; // Puede ser null si no hay token aún
  tokenRespuesta: string | null = null; // Puede ser null si no hay token aún
  isLoading = false; // Controla la visibilidad del spinner
  detectedCountry: string | null = null;
  isPasswordCompromised: boolean = false;

  showSpinner() {
    this.isLoading = true;
    $('.ui.segment').modal('show'); // Muestra el modal con jQuery o Semantic UI

    // Simula una carga y oculta el spinner después de 3 segundos
    setTimeout(() => {
      this.hideSpinner();
    }, 3000);
  }
  get email() {
    return this.personalDataForm.get('email');
  }
  hideSpinner() {
    this.isLoading = false;
    $('.ui.segment').modal('hide'); // Oculta el modal
  }
  constructor(
    private router: Router,
    private msgs: mensageservice,
    private fb: FormBuilder,
    private uservice: UsuarioService,
    private sessionService_: SessionService,
    private mensageservice_: mensageservice,
    private toastr: ToastrService,
    private ngxService: NgxUiLoaderService,
    // private afAuth: AngularFireAuth
  ) {
    this.personalDataForm = this.fb.group({
      username: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.email,
          this.emailValidator(),
          // Validators.pattern(
          //   /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
          // ),
          ,
        ],
      ],
      telefono: ['', [Validators.required, this.telefonoValidator]],
    });

    this.credentialsForm = this.fb.group({
      password: ['', [Validators.required, this.passwordValidator()]],
      confirmPassword: ['', Validators.required],
    });

    // Inicialización de otpForm (Gmail) y otpWhatsappForm (WhatsApp)
    this.otpForm = this.fb.group({
      otpCode: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });

    this.otpWhatsappForm = this.fb.group({
      otpCode: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(4)],
      ],
    });
  }
  passwordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.value;
      const regex =
        /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

      if (regex.test(password)) {
        return null; // Contraseña válida
      } else {
        return {
          invalidPassword: 'La contraseña no cumple con los requisitos.',
        }; // Contraseña inválida
      }
    };
  }

  get isFormValid(): boolean {
    console.log(this.personalDataForm);
    return this.personalDataForm.valid;
  }
  telefonoValidator(control: AbstractControl) {
    const phoneNumber = control.value;
    console.log(phoneNumber);
    const parsedNumber = parsePhoneNumberFromString(phoneNumber);

    if (parsedNumber && isValidPhoneNumber(phoneNumber)) {
      const country = parsedNumber.country; // El país del número
      console.log('El país es:', country);

      return null; // Número válido
    }
    return { invalidPhone: true }; // Número inválido
  }

  emailValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.(com|org|net|edu|gov|io|info|biz|mx|us|uk|es|fr|de|ca|au|jp|xyz|me|tech|co|tv|cloud|ai)$/;

      const valid = emailRegex.test(control.value);
      return valid ? null : { invalidEmail: true };
    };
  }
  updateRemainingChars() {
    const usernameValue = this.personalDataForm.get('username')?.value || '';
    this.remainingChars = 8 - usernameValue.length;
  }

  // Generar código de verificación
  generateCode(option: string) {
    this.displayModal = false; // Cierra el modal principal
    // this.showSpinner();
    if (option === 'gmail') {
      this.resendCodeGmail();
    } else if (option === 'whatsapp') {
      this.resendCodeWhatsapp();
    }
  }

  // Avanzar al siguiente paso del formulario
  goToNextStep() {
    this.personalDataForm.get('otpCode')?.reset();
    // this.ngxService.start(); // start foreground spinner of the master loader with 'default' taskId
    // Stop the foreground loading after 5s
    // this.isLoadingBasic = !this.isLoadingBasic;
    setTimeout(() => {
      this.ngxService.stop(); // stop foreground spinner of the master loader with 'default' taskId
    }, 5000);

    // if (this.personalDataForm.invalid) {
    //   // Recolecta los mensajes de error
    //   let errorMessages = '';

    //   if (this.personalDataForm.get('username')?.hasError('required')) {
    //     errorMessages += '• El nombre es obligatorio.<br>';
    //   }
    //   if (this.personalDataForm.get('username')?.hasError('maxlength')) {
    //     errorMessages += '• El nombre no puede tener más de 15 caracteres.<br>';
    //   }

    //   if (this.personalDataForm.get('email')?.hasError('required')) {
    //     errorMessages += '• El correo es obligatorio.<br>';
    //   }
    //   if (this.personalDataForm.get('email')?.hasError('pattern')) {
    //     errorMessages += '• El formato del correo no es válido.<br>';
    //   }

    //   if (this.personalDataForm.get('telefono')?.hasError('required')) {
    //     errorMessages += '• El número telefónico es obligatorio.<br>';
    //   }
    //   if (this.personalDataForm.get('telefono')?.hasError('pattern')) {
    //     errorMessages +=
    //       '• El número telefónico debe contener exactamente 10 dígitos.<br>';
    //   }

    //   // Muestra el alert con los errores
    //   Swal.fire({
    //     icon: 'error',
    //     title: 'Errores en el formulario',
    //     html: errorMessages,
    //     confirmButtonText: 'Ok',
    //   });
    //   this.personalDataForm.markAllAsTouched(); // Marca todos los campos como tocados

    //   // Desactiva el estado de carga
    //   this.isLoadingBasic = false;
    // } else {
    this.showSpinner();
    // isLoadingBasic
    const username = this.personalDataForm.get('username')?.value;
    const email = this.personalDataForm.get('email')?.value;
    const telefono = this.personalDataForm.get('telefono')?.value;
    if (!username) {
      // Muestra el alert con los errores
      Swal.fire({
        icon: 'error',
        title: 'Errores en el formulario',
        html: 'El username es obligatorio',
        confirmButtonText: 'Ok',
      });
    }
    if (!email) {
      // Muestra el alert con los errores
      Swal.fire({
        icon: 'error',
        title: 'Errores en el formulario',
        html: 'El correo es obligatorio',
        confirmButtonText: 'Ok',
      });
    }
    if (!telefono) {
      // Muestra el alert con los errores
      Swal.fire({
        icon: 'error',
        title: 'Errores en el formulario',
        html: 'El telefono es obligatorio',
        confirmButtonText: 'Ok',
      });
    }

    this.uservice.checkEmailExists(email).subscribe({
      next: () => {
        this.isLoadingBasic = false;
        // Si no hay errores, mostrar el modal
        this.displayModal = true;
      },
      error: () => {
        this.displayModal = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El email ya está registrado', // Mensaje simple de error
          confirmButtonText: 'Ok',
        });
        this.hideSpinner();
      },
    });
    this.uservice.checkTelefonoExists(telefono).subscribe({
      next: () => {
        this.isLoadingBasic = false;
        // Si no hay errores, mostrar el modal
        this.displayModal = true;
      },
      error: () => {
        this.isLoadingBasic = false;
        this.displayModal = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'El telefono ya está registrado', // Mensaje simple de error
          confirmButtonText: 'Ok',
        });
        this.hideSpinner();
      },
    });
    // }
  }

  // Obtiene los controles inválidos y sus nombres
  getInvalidControls() {
    const invalidControls: {
      controlName: string;
      errors: ValidationErrors | null;
    }[] = [];

    Object.keys(this.personalDataForm.controls).forEach((controlName) => {
      const control = this.personalDataForm.get(controlName);
      if (control && control.invalid) {
        invalidControls.push({ controlName, errors: control.errors });
      }
    });

    return invalidControls;
  }

  // Mapea los errores a mensajes legibles
  getErrorMessages(errors: ValidationErrors | null): string {
    const messages: string[] = [];

    if (errors?.['required']) {
      messages.push('El campo es obligatorio.');
    }
    if (errors?.['maxlength']) {
      messages.push(`El campo excede la longitud máxima permitida.`);
    }
    if (errors?.['pattern']) {
      messages.push(`El formato ingresado no es válido.`);
    }

    return messages.join(' ');
  }
  // Retroceder al paso anterior
  goToPreviousStep() {
    this.currentStep = 1;
  }

  // Enviar formulario final
  onSubmit() {
    if (this.credentialsForm.valid) {
      console.log('Formulario enviado:', {
        ...this.personalDataForm.value,
        ...this.credentialsForm.value,
      });
    }
  }

  //! Método para veirificar el código OTP por WhatsApp
  submitOtpWhatsapp() {
    this.showSpinner();
    if (this.otpWhatsappForm.valid) {
      const otpCode = this.otpWhatsappForm.value.otpCode;
      // Obtener el token almacenado previamente
      const tokenRespuesta = this.tokenRespuesta; // Este token debería haberse obtenido al enviar el código

      console.log('tokenRespuesta:', tokenRespuesta);
      if (tokenRespuesta) {
        // Decodificar y validar el token
        const decodedData = this.sessionService_.getUserTokenDecode(
          tokenRespuesta,
          otpCode
        );

        if (decodedData) {
          this.hideSpinner();
          console.log('Código OTP verificado correctamente.');
          Swal.fire(
            'Éxito',
            'El código de verificación es correcto.',
            'success'
          );
          this.currentStep = 2;
          this.displayGmailModal = false;
        } else {
          this.hideSpinner();

          // console.warn('El código OTP proporcionado no es correcto.');
          Swal.fire(
            'Error',
            'El código de verificación es incorrecto.',
            'error'
          );
        }
      } else {
        this.hideSpinner();

        // console.error('No se encontró un token para validar.');
        Swal.fire(
          'Error',
          'No se pudo validar el código de verificación.',
          'error'
        );
      }
    } else {
      this.hideSpinner();

      console.log('Código OTP (Gmail) inválido.');
      Swal.fire('Error', 'Por favor ingrese un código válido.', 'error');
    }
  }

  //! Método para veirificar el código OTP por Gmail
  submitOtp() {
    this.showSpinner();
    if (this.otpForm.valid) {
      const otpCode = this.otpForm.value.otpCode;
      // Obtener el token almacenado previamente
      const tokenRespuesta = this.tokenRespuesta; // Este token debería haberse obtenido al enviar el código

      console.log('tokenRespuesta:', tokenRespuesta);
      if (tokenRespuesta) {
        // Decodificar y validar el token
        const decodedData = this.sessionService_.getUserTokenDecode(
          tokenRespuesta,
          otpCode
        );

        if (decodedData) {
          this.hideSpinner();
          console.log('Código OTP verificado correctamente.');
          Swal.fire(
            'Éxito',
            'El código de verificación es correcto.',
            'success'
          );
          this.currentStep = 2;
          this.displayGmailModal = false;
        } else {
          this.hideSpinner();

          // console.warn('El código OTP proporcionado no es correcto.');
          Swal.fire(
            'Error',
            'El código de verificación es incorrecto.',
            'error'
          );
        }
      } else {
        this.hideSpinner();

        // console.error('No se encontró un token para validar.');
        Swal.fire(
          'Error',
          'No se pudo validar el código de verificación.',
          'error'
        );
      }
    } else {
      this.hideSpinner();

      console.log('Código OTP (Gmail) inválido.');
      Swal.fire('Error', 'Por favor ingrese un código válido.', 'error');
    }
  }

  // validacionesPassword = {
  //   tieneMinuscula: false,
  //   tieneMayuscula: false,
  //   tieneNumero: false,
  //   tieneSimbolo: false,
  //   longitudMinima: false,
  //   longitudMayor5: false,
  //   tiene5CaracteresDiferentes: false,
  // };
  coincidenPasswords = false;

  // validacionesPassword = {
  //   tieneMinuscula: false,
  //   tieneMayuscula: false,
  //   tieneNumero: false,
  //   tieneSimbolo: false,
  //   longitudMinima: false,
  //   longitudMayor5: false,
  //   tiene5CaracteresDiferentes: false,
  // };

  // verificarPassword() {
  //   const password = this.credentialsForm.get('password')?.value || '';
  //   // Contadores de los caracteres presentes
  //   const mayusculas = (password.match(/[A-Z]/g) || []).length;
  //   const minusculas = (password.match(/[a-z]/g) || []).length;
  //   const numeros = (password.match(/[0-9]/g) || []).length;
  //   const especiales = (password.match(/[!@#$&*]/g) || []).length;

  //   // Requisitos mínimos
  //   const mayusculasFaltantes = Math.max(3 - mayusculas, 0);
  //   const minusculasFaltantes = Math.max(4 - minusculas, 0);
  //   const numerosFaltantes = Math.max(4 - numeros, 0);
  //   const especialesFaltantes = Math.max(5 - especiales, 0);
  //   const longitudFaltante = Math.max(16 - password.length, 0);

  //   // Generar un mensaje sobre lo que falta
  //   this.faltantes = []; // Limpiar la lista de faltantes cada vez que se valide la contraseña

  //   if (longitudFaltante > 0)
  //     this.faltantes.push(`${longitudFaltante} caracteres más`);
  //   if (mayusculasFaltantes > 0)
  //     this.faltantes.push(`${mayusculasFaltantes} letras mayúsculas`);
  //   if (minusculasFaltantes > 0)
  //     this.faltantes.push(`${minusculasFaltantes} letras minúsculas`);
  //   if (numerosFaltantes > 0)
  //     this.faltantes.push(`${numerosFaltantes} números`);
  //   if (especialesFaltantes > 0)
  //     this.faltantes.push(`${especialesFaltantes} caracteres especiales`);

  //   // Si no faltan requisitos, la contraseña es válida
  //   if (this.faltantes.length === 0) {
  //     this.passwordStrengthMessage =
  //       'Contraseña válida con el formato adecuado';
  //   } else {
  //     this.passwordStrengthMessage = `Formato incompleto. Faltan: ${this.faltantes.join(
  //       ', '
  //     )}`;
  //   }
  // }

  // // Verificar la fortaleza de la contraseña
  // checkPasswordStrength(password: string) {
  //   if (password.length < 8) {
  //     this.passwordStrengthMessage =
  //       'La contraseña debe tener al menos 8 caracteres.';
  //     this.passwordStrengthClass = 'text-danger';
  //   } else if (
  //     !/[a-z]/.test(password) ||
  //     !/[A-Z]/.test(password) ||
  //     !/\d/.test(password)
  //   ) {
  //     this.passwordStrengthMessage =
  //       'La contraseña debe contener letras y números.';
  //     this.passwordStrengthClass = 'text-warning';
  //   } else {
  //     this.passwordStrengthMessage = 'Contraseña fuerte';
  //     this.passwordStrengthClass = 'text-success';
  //   }
  // }

  // Verificar si la contraseña está comprometida
  // async checkIfPasswordIsPwned(password: string) {
  //   const hash = await this.getPasswordHash(password);
  //   const prefix = hash.slice(0, 5); // Primeros 5 caracteres
  //   const suffix = hash.slice(5); // El resto del hash

  //   try {
  //     const response = await axios.get(
  //       `https://api.pwnedpasswords.com/range/${prefix}`
  //     );
  //     const matches = response.data.split('\n');

  //     this.isPasswordCompromised = false; // Resetear estado

  //     for (let match of matches) {
  //       const [matchHash, count] = match.split(':');
  //       if (matchHash === suffix) {
  //         this.isPasswordCompromised = true; // Contraseña comprometida
  //         this.toastr.error(
  //           `¡Esta contraseña ha sido comprometida! Se ha encontrado ${count} veces.`,
  //           'Advertencia',
  //           {
  //             toastClass: 'toast error', // Aplica tus estilos personalizados
  //           }
  //         );
  //         break;
  //       }
  //     }

  //     if (!this.isPasswordCompromised) {
  //       this.passwordStrengthClass = 'text-success'; // Si no está comprometida, mantener mensaje positivo
  //     }
  //   } catch (error) {
  //     console.error('Error al verificar la contraseña', error);
  //   }
  // }

  // Generar hash SHA-1 usando la Web Crypto API
  // async getPasswordHash(password: string): Promise<string> {
  //   const encoder = new TextEncoder();
  //   const data = encoder.encode(password);
  //   const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  //   const hashArray = Array.from(new Uint8Array(hashBuffer));
  //   const hashHex = hashArray
  //     .map((byte) => byte.toString(16).padStart(2, '0'))
  //     .join('');
  //   return hashHex.toUpperCase();
  // }

  // Validador de fuerza de la contraseña
  // passwordStrengthValidator() {
  //   return () => {
  //     const password = this.credentialsForm.get('password')?.value || '';
  //     const isValid =
  //       /[a-z]/.test(password) &&
  //       /[A-Z]/.test(password) &&
  //       /\d/.test(password) &&
  //       password.length >= 8;

  //     return isValid ? null : { passwordStrength: true };
  //   };
  // }

  // Verificar si las contraseñas coinciden

  verificarCoincidencia() {
    const password = this.credentialsForm.get('password')?.value;
    const confirmPassword = this.credentialsForm.get('confirmPassword')?.value;
    this.coincidenPasswords = password === confirmPassword;

    console.log(this.credentialsForm);
    if (!this.coincidenPasswords) {
      this.credentialsForm
        .get('confirmPassword')
        ?.setErrors({ mismatch: true });
    } else {
      this.credentialsForm.get('confirmPassword')?.setErrors(null);
    }
  }
  verificarPassword() {
    const password = this.credentialsForm.get('password')?.value || '';
    this.faltantes = []; // Limpiar la lista de faltantes

    if (!/[A-Z]/.test(password)) {
      this.faltantes.push('Al menos una letra mayúscula.');
    }
    if (!/[a-z]/.test(password)) {
      this.faltantes.push('Al menos una letra minúscula.');
    }
    if (!/\d/.test(password)) {
      this.faltantes.push('Al menos un dígito.');
    }
    if (!/[@$!%*?&]/.test(password)) {
      this.faltantes.push('Al menos un carácter especial (@$!%*?&).');
    }
    if (password.length < 8) {
      this.faltantes.push('Al menos 8 caracteres.');
    }

    // Actualizar el estado del formulario
    if (this.faltantes.length > 0) {
      this.credentialsForm
        .get('password')
        ?.setErrors({ invalidPassword: true });
    } else {
      this.credentialsForm.get('password')?.setErrors(null);
    }
  }

  registroCliente(): void {
    if (this.personalDataForm.valid && this.credentialsForm.valid) {
      const username = this.personalDataForm.get('username')?.value;
      const email = this.personalDataForm.get('email')?.value;
      const telefono = this.personalDataForm.get('telefono')?.value;
      const password = this.credentialsForm.get('password')?.value;

      // Crear el objeto USUARIO accediendo campo por campo
      const USUARIO = {
        nombre: username,
        email: email,
        telefono: telefono,
        password: password,
      };

      this.showSpinner();
      console.log(USUARIO);
      // Llama al servicio de registro, asumiendo que tienes un servicio de usuario
      this.uservice.register(USUARIO).subscribe(
        (response) => {
          console.log('Response:', response);
          // Swal.fire('Exitoso', 'El registro fue exitoso', 'success');
          // this.personalDataForm.reset(); // Resetea el formulario de datos básicos
          // this.datosConfidencialesForm.reset(); // Resetea el formulario de datos confidenciales
          // this.politicasForm.reset(); // Resetea el formulario de políticas
          this.hideSpinner();
          Swal.fire(
            'Bienvenido a la tienda en linea de ATELIER',
            'Se ha activado tu cuenta, ya puedes continuar.',
            'info'
          ).then(() => {
            // Redirigir al login después de cerrar el modal de SweetAlert
            this.router.navigate(['/public/inicio']);
          });
        },
        (error) => {
          console.error(error);
          // this.resetErrorMessages(); // Limpia mensajes de error antes de asignar nuevos

          // Extract the error message from the response (adjust as per your backend structure)
          const errorMessage =
            error.error?.message || 'An unknown error occurred';

          // Display the backend error message using Toastr
          this.toastr.error(errorMessage, 'Error');
        }
      );
    //   this.afAuth
    //     .createUserWithEmailAndPassword(email, password)
    //     .then(() => {
    //       alert('Usuario:' + username + 'resgistrado');
    //     })
    //     .catch((error) => {
    //       alert(error.message);
    //     });
    }
  }

  // Método para reenviar el código por WhatsApp

  resendCodeWhatsapp() {
    this.showSpinner();
    const number_to_send = this.personalDataForm.get('telefono')?.value;
    this.mensageservice_.enviarTokenWasthapp(number_to_send).subscribe({
      next: (response) => {
        this.tokenRespuesta = response.token;
        this.hideSpinner();
        console.log('Token recibido:', this.tokenRespuesta);

        this.personalDataForm.get('otpCode')?.reset();

        this.displayWhatsappModal = true; // Muestra el modal de WhatsApp
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo enviar el código. Por favor, intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }
  resendCodeGmail() {
    this.showSpinner();

    const email = this.personalDataForm.get('email')?.value;

    this.mensageservice_.enviarTokenCorreo(email).subscribe({
      next: (response) => {
        this.tokenRespuesta = response.token;
        console.log('Token recibido:', this.tokenRespuesta);

        this.hideSpinner();

        this.displayGmailModal = true; // Muestra el modal de WhatsApp
      },
      error: () => {
        Swal.fire({
          title: 'Error',
          text: 'No se pudo enviar el código. Por favor, intente nuevamente.',
          icon: 'error',
          confirmButtonText: 'Ok',
        });
      },
    });
  }

  resendCodeByOtherMethod() {
    if (this.displayGmailModal) {
      this.displayGmailModal = false;
      Swal.fire({
        title: 'Seleccione un método',
        text: '¿Cómo desea recibir el código de verificación?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'WhatsApp',
        // cancelButtonText: 'SMS',
      }).then((result) => {
        if (result.isConfirmed) {
          this.resendCodeWhatsapp(); // Llama al método de envío por WhatsApp
        }
        // else {
        //   this.resendCodeSMS(); // Llama al método para SMS
        // }
      });
    } else if (this.displayWhatsappModal) {
      this.displayWhatsappModal = false;
      Swal.fire({
        title: 'Seleccione un método',
        text: '¿Cómo desea recibir el código de verificación?',
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Gmail',
        // cancelButtonText: 'SMS',
      }).then((result) => {
        if (result.isConfirmed) {
          this.resendCodeGmail(); // Llama al método de envío por Gmail
        }
        //  else {
        //   this.resendCodeSMS(); // Llama al método para SMS
        // }
      });
    }
  }
}
