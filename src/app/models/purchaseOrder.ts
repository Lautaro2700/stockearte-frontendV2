export interface PurchaseOrder {
    id?: number;
    orders?: OrderDetail[];
    estado?: string;
    observaciones?: string;
    ordenDespacho?: string;
    fechaSolicitud?: string | Date; 
    fechaRecepcion?: string | Date; 
    idTienda?: number;
}
export interface OrderDetail {
    productId: number;
    quantity: number;
}