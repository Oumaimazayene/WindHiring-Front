import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { TestLogique } from "src/app/Models/TestLogique";

@Injectable({
  providedIn: "root",
})
export class TestService {
  private readonly baseUrl = "http://localhost:8070/tests";

  constructor(private http: HttpClient) {}

  getTestById(id: number): Observable<TestLogique> {
    return this.http.get<TestLogique>(`${this.baseUrl}/${id}`);
  }

  getAllTests(): Observable<TestLogique[]> {
    return this.http.get<TestLogique[]>(`${this.baseUrl}/tests`);
  }

  updateTest(id: number, test: TestLogique): Observable<TestLogique> {
    return this.http.put<TestLogique>(`${this.baseUrl}/${id}`, test);
  }

  deleteTest(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  deleteAllTests(): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/test`);
  }
  createTestLog(
    testSectionUUID: string,
    size: number,
    privateqts: number
  ): Observable<any> {
    return this.http
      .post<any>(`${this.baseUrl}/createTestLogic`, {
        testSectionUUID,
        size,
        privateqts,
      })
      .pipe(
        catchError((error) => {
          console.error(
            "Une erreur s'est produite lors de la création du test logique :",
            error
          );
          return throwError(
            "Une erreur s'est produite lors de la création du test logique."
          );
        })
      );
  }
}
