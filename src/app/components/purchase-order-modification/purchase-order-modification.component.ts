import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { PurchaseOrder } from 'src/app/models/purchaseOrder';
import { PurchaseOrderService } from 'src/app/services/purchase_order.service';

@Component({
  selector: 'app-purchase-order-modification',
  templateUrl: './purchase-order-modification.component.html',
  styleUrls: ['./purchase-order-modification.component.css']
})
export class PurchaseOrderModificationComponent {
  validateOrder: FormGroup;
  response: string | undefined;
  orderId!: number;

  constructor(
    private authenticationService: AuthService,
    private purchaseOrderService: PurchaseOrderService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.validateOrder = new FormGroup({
      estado: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      observaciones: new FormControl('', [Validators.maxLength(100)]),
      fechaSolicitud: new FormControl('', [Validators.required]),
      fechaRecepcion: new FormControl('', [Validators.required]),
      idTienda: new FormControl([], [Validators.required]),
    });
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.orderId = params['orderId'];
      this.getOrder(this.orderId);
    });
  }

  onSubmit(): void {
    this.response = "";
    if (this.validateOrder.valid) {
      const order: PurchaseOrder = {
        id: this.orderId,
        estado: this.validateOrder.get('estado')?.value,
        observaciones: this.validateOrder.get('observaciones')?.value,
        fechaSolicitud: new Date(this.validateOrder.get('fechaSolicitud')?.value),
        fechaRecepcion: new Date(this.validateOrder.get('fechaRecepcion')?.value),
        idTienda: this.validateOrder.get('idTienda')?.value,
      };
      this.editOrder(order);
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }

  editOrder(order: PurchaseOrder): void {
    this.purchaseOrderService.editarOrdenDeCompra(order).subscribe(response => {
      if (response.success) {
        this.router.navigate(["/purchase-orders"]);
      } else {
        this.response = "El formulario contiene errores. Por favor, verifique los campos.";
      }
    });
  }

  getOrder(id: number): void {
    this.purchaseOrderService.obtenerOrdenPorId(id).subscribe(response => {
      if (response) {
        this.validateOrder.patchValue({
          estado: response.estado,
          observaciones: response.observaciones,
          fechaSolicitud: response.fechaSolicitud,
          fechaRecepcion: response.fechaRecepcion,
          idTienda: response.idTienda,
        });
      }
    });
  }

  index() {
    this.router.navigate(['/purchase-orders']);
  }

  logout() {
    this.authenticationService.logout();
  }
}
