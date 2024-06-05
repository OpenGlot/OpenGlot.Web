import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = '/api'; // Update with your API base URL

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('access_token');
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  get<T>(endpoint: string): Observable<T> {
    const headers = this.getHeaders();
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { headers });
  }

  post<T>(endpoint: string, data: any): Observable<T> {
    const headers = this.getHeaders();
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data, { headers });
  }

  // Add other HTTP methods (put, delete) as needed
}
