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
  showElement: boolean = false;
  constructor(
    private authenticationService: AuthService,
    private purchaseOrderService: PurchaseOrderService,
    private router: Router
  ){
    this.filterForm = new FormGroup({
      filter: new FormControl("", [Validators.required, Validators.pattern(/^[^<>]+$/)])
    });
  }

  ngOnInit() {
    const storeId = localStorage.getItem('storeId');
    this.showElement = storeId == '0'
    this.getPurchaseOrders();
  }

  getPurchaseOrders(){
    const storeId = 0; 
    this.purchaseOrderService.obtenerOrdenesDeCompra(storeId).subscribe(
      (response) => {
          this.purchaseOrders = response.purchaseOrders; 
      },
      (error) => {
          console.error('Error al obtener las órdenes de compra:', error);
      }
    );
  }

  createPurchaseOrder(){
    this.router.navigate(['/purchase-order/creation']);
  }

  logout(){
    this.authenticationService.logout();
  }
}
