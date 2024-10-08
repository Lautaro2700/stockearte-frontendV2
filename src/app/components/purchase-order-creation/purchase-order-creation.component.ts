import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { PurchaseOrderService } from 'src/app/services/purchase_order.service';

@Component({
  selector: 'app-purchase-order-creation',
  templateUrl: './purchase-order-creation.component.html',
  styleUrls: ['./purchase-order-creation.component.css']
})
export class PurchaseOrderCreationComponent {
  validatePurchaseOrder: FormGroup;
  response: string | undefined;

  constructor(
    private authenticationService: AuthService,
    private purchaseOrderService: PurchaseOrderService, 
    private router: Router
  ) {
    this.validatePurchaseOrder = new FormGroup({
      estado: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      observaciones: new FormControl('', [Validators.maxLength(100)]),
      ordenDespacho: new FormControl('', [Validators.maxLength(20)]),
      fechaSolicitud: new FormControl('', [Validators.required]),
      fechaRecepcion: new FormControl(),
      idTienda: new FormControl('', [Validators.required]),
    });
  }

  onSubmit(): void {
    this.response = "";
    if (this.validatePurchaseOrder.valid) {
      const estado = this.validatePurchaseOrder.get('estado')?.value;
      const observaciones = this.validatePurchaseOrder.get('observaciones')?.value;
      const ordenDespacho = this.validatePurchaseOrder.get('ordenDespacho')?.value;
      const fechaSolicitud = this.validatePurchaseOrder.get('fechaSolicitud')?.value;
      const fechaRecepcion = this.validatePurchaseOrder.get('fechaRecepcion')?.value;
      const idTienda = this.validatePurchaseOrder.get('idTienda')?.value;

      this.createPurchaseOrder(estado, observaciones, ordenDespacho, fechaSolicitud, fechaRecepcion, idTienda);
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }

  createPurchaseOrder(estado: string, observaciones: string, ordenDespacho: string, fechaSolicitud: string, fechaRecepcion: string, idTienda: number): void {
    const purchaseOrderData = {
      estado,
      observaciones,
      ordenDespacho,
      fechaSolicitud,
      fechaRecepcion,
      idTienda
    };

    this.purchaseOrderService.crearOrdenDeCompra(purchaseOrderData).subscribe(
      response => {
        this.response = "Orden de compra creada exitosamente.";
        this.router.navigate(["/orders"]);
      },
      error => {
        this.response = "Error al crear la orden de compra. " + error.message;
      }
    );
  }

  logout() {
    this.authenticationService.logout();
  }
}
