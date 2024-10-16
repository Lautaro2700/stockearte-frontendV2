import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { PurchaseOrderService } from 'src/app/services/purchase_order.service';
import { PurchaseOrder } from 'src/app/models/purchaseOrder';

@Component({
  selector: 'app-purchase-order-creation',
  templateUrl: './purchase-order-creation.component.html',
  styleUrls: ['./purchase-order-creation.component.css']
})
export class PurchaseOrderCreationComponent {
  validatePurchaseOrder: FormGroup;
  response: string = '';

  constructor(
    private fb: FormBuilder, 
    private authenticationService: AuthService, 
    private purchaseOrderService: PurchaseOrderService,
    private router: Router) 
    {
    this.validatePurchaseOrder = this.fb.group({
      orders: this.fb.array([this.createOrder()])
    });
  }
  ngOnInit(): void { 
    console.log(localStorage.getItem('storeId'))
  }
  orders(): FormArray {
    return this.validatePurchaseOrder.get('orders') as FormArray;
  }
  createOrder(): FormGroup {
    return this.fb.group({
      codigo: ['', Validators.required],
      color: ['', Validators.required],
      talle: ['', Validators.required],
      cantidad: [1, [Validators.required, Validators.min(1)]]
    });
  }
  addOrder(): void {
    this.orders().push(this.createOrder());
  }
  removeOrder(index: number): void {
    if (this.orders().length > 1) {
      this.orders().removeAt(index);
    }
  }
  onSubmit(): void {
    this.response = "";
    if (this.validatePurchaseOrder.valid) {
      const purchaseOrder: PurchaseOrder = {
        idTienda: parseInt(localStorage.getItem('storeId') || '0', 10),
        orders: this.validatePurchaseOrder.value.orders
      };
      console.log(purchaseOrder.idTienda)
      this.purchaseOrderService.crearOrdenDeCompra(purchaseOrder).subscribe({
        next: (response) => {
          this.router.navigate(['/purchase-order']);
        },
        error: (error) => {
          console.error('Error al crear la orden', error);
        }
      });
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }
  logout() {
    this.authenticationService.logout();
  }
}
