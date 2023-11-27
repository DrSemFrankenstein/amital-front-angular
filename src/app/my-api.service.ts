import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MyApiService {
  private apiUrl = 'https://localhost:7203';

  constructor(private http: HttpClient) {}

  // GET request
  get(endpoint: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}${endpoint}`);
  }

  // POST request
  create(endpoint: string, item: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}${endpoint}`, item);
  }

  // PUT (update) request
  update(endpoint: string, id: number, updatedItem: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}${endpoint}/${id}`, updatedItem);
  }

  // DELETE request
  delete(endpoint: string, id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}${endpoint}/${id}`);
  }
}
