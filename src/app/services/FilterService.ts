import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { Filters } from 'src/app/models/filters';
import { FilterResponse } from 'src/app/models/filtersResponse'

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  private apiUrl = 'http://localhost:5000/api/filters'; 

  constructor(private http: HttpClient) { }

  saveFilters(filters: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/save`, filters);
  }
  getSavedFilters(): Observable<FilterResponse> {
    return this.http.get<FilterResponse>(`${this.apiUrl}/get`);
  }

  deleteFilter(id: number) {
    const requestBody = { id };
    return this.http.post(`${this.apiUrl}/delete`, requestBody);
  }

}

  
    
