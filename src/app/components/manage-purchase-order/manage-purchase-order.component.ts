import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseOrder } from 'src/app/models/purchaseOrder';
import { PurchaseOrderService } from 'src/app/services/purchase_order.service';
import { FilterService } from 'src/app/services/FilterService';
import { Filters } from 'src/app/models/filters';
import { FilterResponse } from 'src/app/models/filtersResponse'



@Component({
  selector: 'app-manage-purchase-order',
  templateUrl: './manage-purchase-order.component.html',
  styleUrls: ['./manage-purchase-order.component.css'] 
})
export class ManagePurchaseOrdersComponent implements OnInit {
  purchaseOrders: PurchaseOrder[] = [];
  filterForm: FormGroup;
  activeFilter: boolean = false;
  showDetails: boolean[] = [];
  
  isCentralUser = false; 
  savedFilters: Filters[] = [];

  constructor(
    private authenticationService: AuthService,
    private purchaseOrderService: PurchaseOrderService,
    private filterService: FilterService,
    private router: Router
  ){
    this.filterForm = new FormGroup({
      codigoProducto: new FormControl(''),
      fechaDesde: new FormControl(''),
      fechaHasta: new FormControl(''),
      estado: new FormControl(''),
      tienda: new FormControl(''),
      filtroNombre: new FormControl(''),
    });
  }

  ngOnInit() {
    const storeId = Number(localStorage.getItem('storeId'));
    this.isCentralUser = storeId === 0;
    this.loadSavedFilters();
    this.getPurchaseOrders(0);
    
  }

  loadSavedFilters() {
    console.log('FUNCION SAVED FILTERS . TS')
    this.filterService.getSavedFilters().subscribe({
      next: (response: FilterResponse) => {
        this.savedFilters = response.filters;
        this.savedFilters = response.filters.map(filter => ({
          ...filter,
          desde: this.formatDate(filter.desde),
          hasta: this.formatDate(filter.hasta)
        }));
      },
      error: (error) => {
        console.error('Error al cargar filtros guardados', error);
      }
    });
  }

  public formatDate(dateString: string): string {
    const parts = dateString.split(/[-T:]/); 
    const year = parts[0];
    const month = parts[1]; 
    const day = parts[2];
    return `${String(day).padStart(2, '0')}/${String(Number(month)).padStart(2, '0')}/${year}`;
}

  getPurchaseOrders(storeId: number) {
    const filters = this.filterForm.value;
    const codigoProducto = filters.codigoProducto ? filters.codigoProducto : '';
    const tienda = filters.tienda ? filters.tienda : 0;
    const estado = filters.estado ? filters.estado : '';
    if(storeId == 0){
      filters.storeId = 0
    } else {
      filters.storeId = 1
    }
    this.purchaseOrderService.obtenerOrdenPorIdSoap(
      filters.storeId,
      codigoProducto,
      filters.fechaDesde,
      filters.fechaHasta,
      estado,
      tienda
    ).subscribe({
      next: (response) => {
        console.log(response);
        this.purchaseOrders = response;
        this.showDetails = new Array(this.purchaseOrders.length).fill(false);
      },
      error: (error) => {
        console.error('Error al obtener ordenes de compra', error);
      }
    });
  }
  toggleDetails(index: number) {
    this.showDetails[index] = !this.showDetails[index];
  }
  createPurchaseOrder() {
    this.router.navigate(['/purchase-order/creation']);
  }
  logout() {
    this.authenticationService.logout();
  }
  clearFilters() {
    this.filterForm.reset();
    this.getPurchaseOrders(0);
  }
  saveFilters() {
    const filters = this.filterForm.value;
    this.filterService.saveFilters(filters).subscribe({
      next: (response) => {
        console.log('Filtros guardados exitosamente', response);
        location.reload();
      },
      error: (error) => {
        console.error('Error al guardar filtros', error);
      }
    });
  }

  deleteFilter(id: number) {
    this.filterService.deleteFilter(id).subscribe({
      next: (response) => {
        console.log('Filtro eliminado con exito', response);
        location.reload();
      },
      error: (error) => {
        console.error('Error al eliminar filtros', error);
      }
    });
  }

  loadFilter(filter: any) {
    this.filterForm.patchValue({
      codigoProducto: filter.productCode,
      fechaDesde: this.formatDateFilter(filter.desde),
      fechaHasta: this.formatDateFilter(filter.hasta),
      estado: filter.state,
      tienda: filter.idTienda,
      filtroNombre: filter.filtersName
    });
  }

  private formatDateFilter(date: string | null): string {
    if (!date) return '';
    const parsedDate = new Date(date);
    const year = parsedDate.getFullYear();
    const month = String(parsedDate.getMonth() + 1).padStart(2, '0'); 
    const day = String(parsedDate.getDate()).padStart(2, '0');
    return `${year}-${day}-${month}`; 
  }

}
