import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

// -------------------------------------------
// 🔹 Fixed provider typing (Point 6)
// -------------------------------------------
export interface ExternalLoginDto {
  provider: 'google' | 'facebook'; // narrowed type (literal union)
  providerId: string;
  email: string;
  name?: string;
  profileImageUrl?: string;
}

// -------------------------------------------
export interface LoginDto { email: string; password: string; }
export interface RegisterDto { name: string; email: string; password: string; phone?: string; isAgent:boolean}
export interface AuthResponse { token: string; name: string; email: string; role: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private api = `${environment.apiUrl}/auth`;
  private tokenKey = environment.auth.tokenStorageKey;

  private _isLoggedIn$ = new BehaviorSubject<boolean>(this.hasToken());
  isLoggedIn$ = this._isLoggedIn$.asObservable();

  register(data: RegisterDto): Observable<any> {
    return this.http.post(`${this.api}/register`, data);
  }

  login(data: LoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/login`, data)
      .pipe(tap(res => this.setSession(res.token)));
  }

  externalLogin(data: ExternalLoginDto): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.api}/external-login`, data)
      .pipe(tap(res => this.setSession(res.token)));
  }
// ✅ Add this helper right here
loginWithPhone(emailOrPhone: string, password: string): Observable<AuthResponse> {
  const payload = { email: emailOrPhone, password } as LoginDto;
  return this.login(payload);
}
  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this._isLoggedIn$.next(false);
    this.router.navigateByUrl(environment.auth.afterLogoutRedirect);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setSession(token: string) {
    localStorage.setItem(this.tokenKey, token);
    this._isLoggedIn$.next(true);
  }

  private hasToken(): boolean {
    return !!localStorage.getItem(this.tokenKey);
  }

  storeToken(token: string) {
    this.setSession(token); 
  }
  getUserRole(): string | null {
  const token = this.getToken();
  if (!token) return null;

  const payload = JSON.parse(atob(token.split('.')[1]));
  return payload['role'] ?? null;
}
}
