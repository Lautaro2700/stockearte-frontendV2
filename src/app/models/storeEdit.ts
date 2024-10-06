export interface StoreEdit { 
    storeId?: number;
    code?: string;
    address?: string;
    city?: string;
    province?: string;
    enabled?: boolean;
    usersId?: number[];
    productsId?: number[];
}