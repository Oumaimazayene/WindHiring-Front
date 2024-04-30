import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, catchError, throwError } from "rxjs";
import { questionTech } from "src/app/Models/questionTech";

@Injectable({
  providedIn: "root",
})
export class QuestionsTechService {
  private baseUrl = "http://localhost:8070/questionsTech";

  constructor(private http: HttpClient) {}

  getAll(): Observable<questionTech[]> {
    return this.http.get<questionTech[]>(`${this.baseUrl}/all`);
  }

  addQuestionTech(question: any): Observable<any> {
    const headers = new HttpHeaders({
      "Content-Type": "application/json",
    });

    return this.http
      .post<any>(`${this.baseUrl}/add`, question, { headers })
      .pipe(
        catchError((error) => {
          // Gérer les erreurs ici
          console.error(
            "Erreur lors de l'ajout de la question technique : ",
            error
          );
          return throwError(error);
        })
      );
  }

  deleteQuestionTech(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(
          "Erreur lors de la suppression de la question technique : ",
          error
        );
        return throwError(error);
      })
    );
  }
  getQuestionTechById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/${id}`).pipe(
      catchError((error) => {
        console.error(
          "Erreur lors de la récupération de la question technique : ",
          error
        );
        return throwError(error);
      })
    );
  }
}
