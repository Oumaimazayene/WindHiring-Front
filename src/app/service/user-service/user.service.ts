import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { User } from "../../Models/user";

@Injectable({
  providedIn: "root",
})
export class UserService {
  private apiUrl = "http://localhost:8090/recrutteur";

  constructor(private http: HttpClient) {}

  getUserByUUID(uuid: string): Observable<User> {
    // Spécifier le type de retour comme Observable<User>
    return this.http
      .get<User>(`${this.apiUrl}/${uuid}`) // Spécifier le type de réponse comme User
      .pipe(catchError(this.handleError));
  }
  getAllUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiUrl}/allusers`)
      .pipe(catchError(this.handleError));
  }

  getAllValidUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(`${this.apiUrl}/allvalid`)

      .pipe(catchError(this.handleError));
  }
  getAllNotValidUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/allNotvalid`);
  }
  private handleError(error: any): Observable<never> {
    console.error("Erreur de requête :", error);
    throw new Error("Une erreur est survenue, veuillez réessayer plus tard.");
  }
  validateUser(userId: number): Observable<any> {
    const url = `${this.apiUrl}/validate/${userId}`;
    return this.http.post<any>(url, {}).pipe(
      catchError((error) => {
        console.error("Erreur lors de la validation de l'utilisateur :", error);
        return throwError(
          "Une erreur est survenue, veuillez réessayer plus tard."
        );
      })
    );
  }

  updateUser(id: number, formData: FormData): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, formData).pipe(
      catchError((error) => {
        console.error(
          "Erreur lors de la mise à jour de l'utilisateur :",
          error
        );
        return throwError(
          "Une erreur est survenue, veuillez réessayer plus tard."
        );
      })
    );
  }
}
