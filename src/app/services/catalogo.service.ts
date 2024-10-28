import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Catalogo } from '../models/catalogo';

@Injectable({
    providedIn: 'root'
})
export class CatalogoService {
    private apiUrl = 'http://localhost:5000/catalogos';

    constructor(private http: HttpClient) {}

    getAllCatalogos(): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(this.apiUrl, {}, { headers });
      }

    createCatalogo(catalogo: Catalogo): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.apiUrl}/create`, catalogo, { headers });
    }

    deleteCatalogo(id: number): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.apiUrl}/delete`, { id }, { headers });
    }

    updateCatalogo(catalogo: Catalogo): Observable<any> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.post<any>(`${this.apiUrl}/update`, catalogo, { headers });
    }

    getCatalogoById(id: number): Observable<Catalogo> {
        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        return this.http.get<Catalogo>(`${this.apiUrl}/${id}`, { headers }); 
    }
}