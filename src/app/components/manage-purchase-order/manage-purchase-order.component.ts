import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PurchaseOrder } from 'src/app/models/purchaseOrder';
import { PurchaseOrderService } from 'src/app/services/purchase_order.service';

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
  savedFilters = [];
  isCentralUser = false; 

  constructor(
    private authenticationService: AuthService,
    private purchaseOrderService: PurchaseOrderService,
    private router: Router
  ){
    this.filterForm = new FormGroup({
      codigoProducto: new FormControl(''),
      fechaDesde: new FormControl(''),
      fechaHasta: new FormControl(''),
      estado: new FormControl(''),
      tienda: new FormControl('')
    });
  }

  ngOnInit() {
    const storeId = Number(localStorage.getItem('storeId'));
    this.isCentralUser = storeId === 0;
    this.getPurchaseOrders(0);
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
}
