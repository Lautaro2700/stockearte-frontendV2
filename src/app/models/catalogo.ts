import { Product } from "./product";

export interface Catalogo {
    id?: number;
    titulo?: string;
    tiendaID?: number;
    productos?: Product[];
}