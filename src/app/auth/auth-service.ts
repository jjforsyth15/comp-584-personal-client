import { Injectable } from '@angular/core';
import { LoginRequest } from './login-request';
import { LoginResponse } from './login-response';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { tap } from 'rxjs';
import { RegisterRequest } from '../register/register-request';
import { RegisterResponse } from '../register/register-response';
import { Register } from '../register/register';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = "auth_token";
  private _authStatus = new BehaviorSubject<boolean>(false);
  public authStatus = this._authStatus.asObservable();

  constructor(private http: HttpClient) {}

  init() {
    if (this.isLoggedIn())
      this.setAuthStatus(true);
  }

  setAuthStatus(isLoggedIn: boolean) {
    this._authStatus.next(isLoggedIn);
  }

  login(loginRequest: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.apiUrl + "/api/Users", loginRequest)
    .pipe(tap(response => {
      if (response.success) {
        localStorage.setItem(this.token, response.token);
        this.setAuthStatus(true);
      }
    }));
  }

  logout() {
    localStorage.removeItem(this.token);
    this.setAuthStatus(false);
  }

  getToken(): string | null {
    return localStorage.getItem(this.token);
  }

  isLoggedIn(): boolean {
    return this.getToken() != null;
  }


  register(registerRequest: RegisterRequest) {
    return this.http.post<RegisterResponse>(environment.apiUrl + "/api/Users/register", registerRequest)
    .pipe(tap(response => {
      if (response.success)
        localStorage.setItem(this.token, response.token);
      this.setAuthStatus(true);
    }))
  }

  getRoles(): string[] {
    const token = this.getToken();
    if (!token)
      return [];

    try {
      const payload = JSON.parse(atob(token.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));

      const roleClaim = 
      payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] ??
      payload.role ??
      payload.roles ??
      [];

      return Array.isArray(roleClaim) ? roleClaim : [roleClaim];
    } catch {
      return [];
    }
  }

  isAdmin(): boolean {
    return this.getRoles().includes('administrator');
  }
}
