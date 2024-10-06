import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Store } from "../models/stores";
import { StoreEdit } from "../models/storeEdit";

@Injectable({
    providedIn: 'root'
})

export class TiendasService {
    private apiUrl = 'http://localhost:5000/store';

    constructor(private http: HttpClient){}

    obtenerTiendas(): Observable<{ stores: Store[] }> { 
      return this.http.post<{ stores: Store[] }>(`${this.apiUrl}/get_stores`, {}); 
    }
    
    crearTienda(tienda: Store): Observable<any> {
      return this.http.post<any>(`${this.apiUrl}/create`, tienda);
    }

    editarTienda(storeId: number, tienda: StoreEdit): Observable<any> {
      const store = {
          storeId: storeId,
          code: tienda.code,
          address: tienda.address,
          city: tienda.city,
          province: tienda.province,
          enabled: tienda.enabled,
          usersId: tienda.usersId,
          productsId: tienda.productsId
      };
      return this.http.post<any>(`${this.apiUrl}/edit`, store);
    }

  obtenerTiendaPorId(storeId: number): Observable<StoreEdit> {
    return this.http.post<StoreEdit>(`${this.apiUrl}/get_store`, { storeId: Number(storeId) });
  }
}