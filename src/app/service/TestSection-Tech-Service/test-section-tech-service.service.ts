import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, catchError, throwError } from "rxjs";
import { questionTech } from "src/app/Models/questionTech";
import { TestSectionTech } from "src/app/Models/testSection-Tech";

@Injectable({
  providedIn: "root",
})
export class TestSectionTechServiceService {
  private baseUrl = "http://localhost:8070/test-Sections-Tech";

  constructor(private http: HttpClient) {}

  getTestSectionsByUserUUID(userUUID: string): Observable<TestSectionTech[]> {
    return this.http.get<TestSectionTech[]>(`${this.baseUrl}/user/${userUUID}`);
  }

  createTestSection(testSectionTech: any, userUUID: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/add`, testSectionTech, {
      params: { user_uuid: userUUID },
    });
  }

  getTestSectionById(id: number): Observable<TestSectionTech> {
    return this.http.get<TestSectionTech>(`${this.baseUrl}/${id}`);
  }

  updateTestSection(
    id: number,
    testSectionTech: TestSectionTech
  ): Observable<TestSectionTech> {
    return this.http.put<TestSectionTech>(
      `${this.baseUrl}/${id}`,
      testSectionTech
    );
  }

  deleteTestSection(id: number): Observable<any> {
    return this.http.delete<any>(`${this.baseUrl}/${id}`);
  }

  getAllTestSections(): Observable<TestSectionTech[]> {
    return this.http.get<TestSectionTech[]>(`${this.baseUrl}/all`);
  }
  private handleError(error: any) {
    console.error("An error occurred:", error);
    return throwError("Something went wrong; please try again later.");
  }
  getPrivateQuestionsByTestSectionId(
    testSectionId: number
  ): Observable<questionTech[]> {
    return this.http
      .get<questionTech[]>(
        `${this.baseUrl}/test-section-Tech/${testSectionId}/private-questions`
      )
      .pipe(catchError(this.handleError));
  }

  createPrivateQuestionTechnique(
    questionTechDTo: any,
    testSectionId: number
  ): Observable<any> {
    const url = `${this.baseUrl}/createPrivateQuestionTechnique?testSectionId=${testSectionId}`;
    return this.http
      .post<any>(url, questionTechDTo)
      .pipe(catchError(this.handleError));
  }

  getPrivateQuestionsSumByUserUUID(userUUID: string): Observable<number> {
    const url = `${this.baseUrl}/private-questions-sum/${userUUID}`;
    return this.http.get<number>(url);
  }
}
