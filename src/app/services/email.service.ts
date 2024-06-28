import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {environment} from "../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private base_url: string = `${environment.API_URL}`;
  private apiUrl: string = `${this.base_url}/send-email`; // URL de la API

  constructor(private http: HttpClient) { }

  sendEmail(to: string, subject: string, text: string): Observable<any> {
    let params = new HttpParams();
    params = params.append('to', to);
    params = params.append('subject', subject);
    params = params.append('text', text);
    return this.http.post<any>(this.apiUrl, {}, { params });
  }
}
