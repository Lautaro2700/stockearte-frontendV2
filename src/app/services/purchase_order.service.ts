import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { PurchaseOrder } from "../models/purchaseOrder";

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private readonly baseApiUrl = 'http://localhost:5000/purchaseOrder';

  constructor(private http: HttpClient) {}

  crearOrdenDeCompra(purchaseOrder: PurchaseOrder): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/create`, purchaseOrder);
  }

  obtenerOrdenesDeCompra(idTienda: number): Observable<any> {
    return this.http.get(`${this.baseApiUrl}/getOrdersByStore/${idTienda}`);
  }

  editarOrdenDeCompra(purchaseOrder: PurchaseOrder): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/edit`, purchaseOrder);
  }

  obtenerOrdenPorId(orderId: number): Observable<PurchaseOrder> {
    return this.http.get<PurchaseOrder>(`${this.baseApiUrl}/getOrder/${orderId}`);
  }
}
