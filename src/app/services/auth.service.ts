import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AuthRequest {
  username: string;
  password: string;
}


export interface AuthResponse {
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<string | null>;
  public currentUser: Observable<string | null>;
  private apiUrl = 'http://localhost:8081/api/auth';

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<string | null>(
      localStorage.getItem('token')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): string | null {
    return this.currentUserSubject.value;
  }

  login(username: string, password: string): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, { username, password })
      .pipe(map(response => {
        // Stocker le token JWT dans le localStorage
        localStorage.setItem('token', response.token);
        this.currentUserSubject.next(response.token);
        return response;
      }));
  }

  logout() {
    // Supprimer le token du localStorage lors de la déconnexion
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }

  isLoggedIn(): boolean {
    return this.currentUserValue !== null;
  }
}
