import { Injectable, inject, signal } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap, finalize } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface User {
    id: string;
    email: string;
    createdAt: string;
    lastLogin: string | null;
}

export interface LoginCredentials {
    email: string;
    password: string;
}

export interface RegisterCredentials extends LoginCredentials { }

export interface AuthResponse {
    success: boolean;
    message: string;
    data?: {
        user: User;
        token: string;
    };
    errors?: any[];
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly http = inject(HttpClient);
    private readonly apiUrl = environment.apiUrl;

    // Signals para estado de autenticación
    private readonly _isAuthenticated = signal(false);
    private readonly _currentUser = signal<User | null>(null);
    private readonly _isLoading = signal(false);
    private readonly _error = signal<string | null>(null);

    // Getters públicos para los signals
    readonly isAuthenticated = this._isAuthenticated.asReadonly();
    readonly currentUser = this._currentUser.asReadonly();
    readonly isLoading = this._isLoading.asReadonly();
    readonly error = this._error.asReadonly();

    constructor() {
        // Verificar token existente al inicializar
        this.checkExistingToken();
    }

    /**
     * Registrar nuevo usuario
     */
    register(credentials: RegisterCredentials): Observable<AuthResponse> {
        this._isLoading.set(true);
        this._error.set(null);

        return this.http.post<AuthResponse>(`${this.apiUrl}/register`, credentials)
            .pipe(
                tap(response => {
                    if (response.success && response.data) {
                        this.setAuthData(response.data.user, response.data.token);
                    }
                }),
                catchError(error => this.handleError(error)),
                finalize(() => this._isLoading.set(false))
            );
    }

    /**
     * Iniciar sesión
     */
    login(credentials: LoginCredentials): Observable<AuthResponse> {
        this._isLoading.set(true);
        this._error.set(null);

        return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials)
            .pipe(
                tap(response => {
                    if (response.success && response.data) {
                        this.setAuthData(response.data.user, response.data.token);
                    }
                }),
                catchError(error => this.handleError(error)),
                finalize(() => this._isLoading.set(false))
            );
    }

    /**
     * Obtener perfil del usuario
     */
    getProfile(): Observable<AuthResponse> {
        this._isLoading.set(true);

        return this.http.get<AuthResponse>(`${this.apiUrl}/profile`)
            .pipe(
                tap(response => {
                    if (response.success && response.data) {
                        this._currentUser.set(response.data.user);
                    }
                }),
                catchError(error => this.handleError(error)),
                finalize(() => this._isLoading.set(false))
            );
    }

    /**
     * Cerrar sesión
     */
    logout(): void {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this._isAuthenticated.set(false);
        this._currentUser.set(null);
        this._error.set(null);
    }

    /**
     * Obtener token almacenado
     */
    getToken(): string | null {
        return localStorage.getItem('token');
    }

    /**
     * Verificar si hay token existente
     */
    private checkExistingToken(): void {
        const token = this.getToken();
        const userStr = localStorage.getItem('user');

        if (token && userStr) {
            try {
                const user = JSON.parse(userStr);
                this._isAuthenticated.set(true);
                this._currentUser.set(user);

                // Verificar que el token aún sea válido
                this.getProfile().subscribe({
                    error: () => this.logout()
                });
            } catch (error) {
                this.logout();
            }
        }
    }

    /**
     * Establecer datos de autenticación
     */
    private setAuthData(user: User, token: string): void {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        this._isAuthenticated.set(true);
        this._currentUser.set(user);
    }

    /**
     * Manejar errores HTTP
     */
    private handleError(error: HttpErrorResponse): Observable<never> {
        let errorMessage = 'Ha ocurrido un error inesperado';

        if (error.error && error.error.message) {
            errorMessage = error.error.message;
        } else if (error.status === 0) {
            errorMessage = 'No se puede conectar al servidor. Verifica que el backend esté ejecutándose.';
        } else if (error.status >= 500) {
            errorMessage = 'Error interno del servidor';
        }

        this._error.set(errorMessage);
        return throwError(() => error);
    }

    /**
     * Limpiar errores
     */
    clearError(): void {
        this._error.set(null);
    }
}