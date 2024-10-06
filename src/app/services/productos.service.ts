import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";


@Injectable({
    providedIn: 'root'
})

export class ProductosService {
  private apiUrl = 'http://localhost:5000/product';

    constructor(private http: HttpClient){}

    obtenerProductos(): Observable<any> {
      const requestBody = { habilitado: true };
      return this.http.post(`${this.apiUrl}/filter`, requestBody);
      }
    
      crearProductos(producto: any): Observable<any> { 
       return this.http.post(`${this.apiUrl}/create`, producto);
    }
    filtrarProducto(filtros: any): Observable<any> {  
      return this.http.post(`${this.apiUrl}/filter`, filtros);
    }
}