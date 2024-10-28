export class Filters {
    id: number;
    desde: string; // Fecha en formato ISO
    filtersName: string; // Nombre del filtro
    habilitado: boolean; // Si el filtro está habilitado
    hasta: string; // Fecha en formato ISO
    idTienda: string; // ID de la tienda
    productCode: string; // Código del producto
    state: string; // Estado del filtro
  
    constructor(
      id: number,
      desde: string,
      filtersName: string,
      habilitado: boolean,
      hasta: string,
      idTienda: string,
      productCode: string,
      state: string
    ) {
      this.id = id;
      this.desde = desde;
      this.filtersName = filtersName;
      this.habilitado = habilitado;
      this.hasta = hasta;
      this.idTienda = idTienda;
      this.productCode = productCode;
      this.state = state;
    }
  }