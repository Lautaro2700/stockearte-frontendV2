export interface GetPurchaseOrderResponse {
    purchaseOrders: PurchaseOrder[];
}

export interface PurchaseOrder {
    id?: number;
    orders?: OrderDetail[];
    estado?: string;
    observaciones?: string;
    ordenDespacho?: string;
    fechaSolicitud?: { nanos: number; seconds: number };
    fechaRecepcion?: { nanos: number; seconds: number } | null; 
    id_tienda?: number;
}

export interface OrderDetail {
    cantidad: number;
    codigo: string;
    color: string;
    talle: string;
}
