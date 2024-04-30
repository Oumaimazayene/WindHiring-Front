import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = "http://localhost:8090/api/v1/auth";
  private tokenKey = "token";

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: {
    email: string;
    password: string;
  }): Observable<{ token: string }> {
    return this.http
      .post<{ token: string }>(`${this.apiUrl}/authenticate`, credentials)
      .pipe(
        tap((response) => {
          if (response && response.token) {
            localStorage.setItem(this.tokenKey, response.token);
          }
        }),
        catchError(this.handleError)
      );
  }

  register(userData: any): Observable<any> {
    return this.http
      .post<any>(`${this.apiUrl}/register`, userData)
      .pipe(catchError(this.handleError));
  }

  logout(): void {
    localStorage.removeItem(this.tokenKey);
    this.router.navigate(["/login"]);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(this.tokenKey);
    return !!token && !this.isTokenExpired(token);
  }

  extractUUIDFromToken(): string | null {
    const token = localStorage.getItem(this.tokenKey);
    if (token) {
      try {
        const tokenPayload = token.split(".")[1];
        const decodedPayload = JSON.parse(atob(tokenPayload));
        console.log(decodedPayload.uuid);
        return decodedPayload.uuid || null;
      } catch (error) {
        console.error(
          "Erreur lors de l'extraction de l'UUID du token :",
          error
        );
        return null;
      }
    }
    return null;
  }

  private isTokenExpired(token: string): boolean {
    // Implémentez la logique pour vérifier si le token est expiré
    return false; // Placeholder pour la démo
  }

  private handleError(error: any): Observable<never> {
    console.error("Erreur de requête :", error);
    return throwError("Une erreur est survenue, veuillez réessayer plus tard.");
  }
}
