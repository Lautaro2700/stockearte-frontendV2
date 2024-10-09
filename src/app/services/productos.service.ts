import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Product } from "../models/product";


@Injectable({
    providedIn: 'root'
})

export class ProductosService {
  private apiUrl = 'http://localhost:5000/product';

  constructor(private http: HttpClient){}

  obtenerProductos(requestBody: Product ): Observable<any> {
    return this.http.post(`${this.apiUrl}/filter`, requestBody);
  }
  
  crearProductos(producto: any): Observable<any> { 
    return this.http.post(`${this.apiUrl}/create`, producto);
  }
  filtrarProducto(filtros: any): Observable<any> {  
    return this.http.post(`${this.apiUrl}/filter`, filtros);
  }    
  getProductDetail(requestBody: Product): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/detail`, requestBody);
  }
  editProduct(requestBody: Product): Observable<{ product: Product }>{
    return this.http.post<{ product: Product }>(`${this.apiUrl}/edit`, { requestBody });
  }
  eliminarProducto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete`, { body: { id: id } });
  }
}