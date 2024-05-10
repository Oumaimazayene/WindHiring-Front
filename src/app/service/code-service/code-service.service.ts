import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class CodeServiceService {
  private baseUrl = "http://localhost:8070/app";

  constructor(private http: HttpClient) {}

  // getSupportedLanguages(): Observable<any> {
  //   return this.http.get<any>(`${this.baseUrl}langs`);
  // }

  runScript(
    language: string,
    version: string,
    script: string,
    stdin: string
  ): Observable<any> {
    const body = { language, version, script, stdin };
    return this.http.post<any>(`${this.baseUrl}/run`, body);
  }
}
