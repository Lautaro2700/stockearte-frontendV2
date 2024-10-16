import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { GetPurchaseOrderResponse, PurchaseOrder } from "../models/purchaseOrder";

@Injectable({
  providedIn: 'root'
})
export class PurchaseOrderService {
  private readonly baseApiUrl = 'http://localhost:5000/purchase';
  private readonly baseSoapApiUrl = 'http://localhost:5000/api/purchase-orders';

  constructor(private http: HttpClient) {}

  crearOrdenDeCompra(purchaseOrder: PurchaseOrder): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/create`, purchaseOrder);
  }
  
  editarOrdenDeCompra(purchaseOrder: PurchaseOrder): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/edit`, purchaseOrder);
  }
  
  obtenerOrdenPorId(orderId: number): Observable<GetPurchaseOrderResponse> {
    return this.http.post<GetPurchaseOrderResponse>(`${this.baseApiUrl}/findById`, { id: orderId });
  }  
  
  // Updated method to include additional filtering fields
  obtenerOrdenPorIdSoap(
    orderId: number,
    codigoProducto?: string,
    fechaDesde?: string,
    fechaHasta?: string,
    estado?: string,
    tienda?: number
  ): Observable<PurchaseOrder[]> {
    // Prepare the request payload with all fields
    const requestPayload = {
      id: orderId,
      codigoProducto: codigoProducto,
      fechaDesde: fechaDesde,
      fechaHasta: fechaHasta,
      estado: estado,
      tienda: tienda
    };

    return this.http.post<PurchaseOrder[]>(`${this.baseSoapApiUrl}/findById`, requestPayload);
  }
}
