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

    editarTienda(tienda: StoreEdit): Observable<any>{
      return this.http.post(`${this.apiUrl}/edit`, tienda);
    }
    
    obtenerTiendaPorId(storeId: number): Observable<{ store: StoreEdit }>{
      return this.http.post<{ store: StoreEdit }>(`${this.apiUrl}/get_store`, { storeId: Number(storeId) });
    }
}