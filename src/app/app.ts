import { Component, signal, inject, effect } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { AuthService, LoginCredentials, RegisterCredentials } from './services/auth.service';

@Component({
  selector: 'app-root',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private readonly formBuilder = inject(FormBuilder);
  private readonly authService = inject(AuthService);

  protected readonly title = signal('formHydra');
  protected readonly submitted = signal(false);
  protected readonly loginSuccess = signal(false);
  protected readonly loginError = signal<string | null>(null);
  protected readonly isLoginMode = signal(true); // true = login, false = register

  // Exponer signals del servicio de autenticación
  protected readonly isLoading = this.authService.isLoading;
  protected readonly isAuthenticated = this.authService.isAuthenticated;
  protected readonly currentUser = this.authService.currentUser;

  // Validador personalizado para contraseña segura
  private passwordValidator(control: any) {
    const value = control.value;
    if (!value) return null;

    const hasLowerCase = /[a-z]/.test(value);
    const hasUpperCase = /[A-Z]/.test(value);
    const hasNumber = /\d/.test(value);
    const hasMinLength = value.length >= 6;

    if (!hasMinLength || !hasLowerCase || !hasUpperCase || !hasNumber) {
      return {
        passwordStrength: {
          hasMinLength,
          hasLowerCase,
          hasUpperCase,
          hasNumber
        }
      };
    }

    return null;
  }

  protected readonly authForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]], // Solo required para login inicialmente
    confirmPassword: ['', []] // Solo para registro
  });

  constructor() {
    // Effect para manejar el estado de loading
    effect(() => {
      if (this.isLoading()) {
        this.authForm.disable();
      } else {
        this.authForm.enable();
      }
    });

    // Configurar validaciones iniciales para modo Login
    this.updateValidators();
  }

  private updateValidators(): void {
    const passwordControl = this.authForm.get('password');
    const confirmPasswordControl = this.authForm.get('confirmPassword');

    if (this.isLoginMode()) {
      // Modo Login: solo required para password
      passwordControl?.setValidators([Validators.required]);
      confirmPasswordControl?.setValidators([]);
    } else {
      // Modo Registro: validador complejo para password
      passwordControl?.setValidators([Validators.required, this.passwordValidator.bind(this)]);
      confirmPasswordControl?.setValidators([Validators.required]);
    }

    passwordControl?.updateValueAndValidity();
    confirmPasswordControl?.updateValueAndValidity();
  }

  protected onSubmit(): void {
    if (this.authForm.valid) {
      this.loginError.set(null);
      this.submitted.set(true);

      if (this.isLoginMode()) {
        // Login
        const credentials: LoginCredentials = {
          email: this.authForm.value.email,
          password: this.authForm.value.password
        };

        this.authService.login(credentials).subscribe({
          next: (response) => {
            if (response.success) {
              console.log('Login exitoso:', response);
              this.loginSuccess.set(true);
              this.authForm.reset();
            }
          },
          error: (error) => {
            console.error('Error en login:', error);
            this.loginError.set(error.error?.message || 'Error al iniciar sesión');
            this.loginSuccess.set(false);
            // Resetear estado de submitted para permitir reintento
            this.submitted.set(false);
          }
        });
      } else {
        // Registro
        if (this.authForm.value.password !== this.authForm.value.confirmPassword) {
          this.loginError.set('Las contraseñas no coinciden');
          this.submitted.set(false); // Resetear para permitir reintento
          return;
        }

        const credentials: RegisterCredentials = {
          email: this.authForm.value.email,
          password: this.authForm.value.password
        };

        this.authService.register(credentials).subscribe({
          next: (response) => {
            if (response.success) {
              console.log('Registro exitoso:', response);
              this.loginSuccess.set(true);
              this.authForm.reset();
            }
          },
          error: (error) => {
            console.error('Error en registro:', error);
            console.error('Error response:', error.error);
            console.error('Error status:', error.status);

            let errorMessage = 'Error al registrar usuario';
            if (error.error?.message) {
              errorMessage = error.error.message;
            } else if (error.error?.errors && Array.isArray(error.error.errors)) {
              errorMessage = error.error.errors.map((e: any) => e.msg).join(', ');
            } else if (error.status === 400) {
              errorMessage = 'Datos de registro inválidos. Verifica email y contraseña.';
            }

            this.loginError.set(errorMessage);
            this.loginSuccess.set(false);
            // Resetear estado de submitted para permitir reintento
            this.submitted.set(false);
          }
        });
      }
    } else {
      this.authForm.markAllAsTouched();
    }
  }

  protected toggleMode(): void {
    this.isLoginMode.set(!this.isLoginMode());
    this.authForm.reset();
    this.loginError.set(null);
    this.submitted.set(false);

    // Actualizar validaciones según el modo
    this.updateValidators();
  }

  protected logout(): void {
    this.authService.logout();
    this.loginSuccess.set(false);
    this.submitted.set(false);
    this.loginError.set(null);
    this.isLoginMode.set(true);
  }

  protected clearError(): void {
    this.loginError.set(null);
    this.authService.clearError();
  }
}