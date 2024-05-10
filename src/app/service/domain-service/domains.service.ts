import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Domaine } from "src/app/Models/domaine";

@Injectable({
  providedIn: "root",
})
export class DomainsService {
  private apiUrl = "http://localhost:8070/domaines";
  // Modifiez l'URL pour correspondre à votre endpoint POST

  constructor(private http: HttpClient) {}

  getAllDomaines(): Observable<Domaine[]> {
    return this.http.get<Domaine[]>(this.apiUrl + "/all");
  }

  addDomaine(domaine: Domaine): Observable<Domaine> {
    return this.http.post<Domaine>(this.apiUrl + "/add", domaine);
  }
  deleteDomaine(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
  updateDomaine(id: number, domaine: Domaine): Observable<Domaine> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Domaine>(url, domaine);
  }
  countDomains(): Observable<number> {
    return this.http.get<number>(`${this.apiUrl}/count`);
  }
}
