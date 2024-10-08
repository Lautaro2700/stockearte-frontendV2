import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { Stock } from "../models/stock";

@Injectable({
    providedIn: 'root'
})
export class StockService {
    private apiUrl = 'http://localhost:5000/stock';

    constructor(private http: HttpClient) {}

    crearStock(stock: Stock): Observable<any> {
        return this.http.post(`${this.apiUrl}/create`, stock);
    }

    editarStock(stock: Stock): Observable<any> {
        return this.http.post(`${this.apiUrl}/edit`, stock);
    }

    obtenerStocks(): Observable<any> {
        return this.http.post(`${this.apiUrl}/get_stocks`, {});
    }

    obtenerStock(id: number): Observable<any> {
        return this.http.post(`${this.apiUrl}/get_stock`, { id });
    }
}
