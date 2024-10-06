import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-stock-modification',
  templateUrl: './stock-modification.component.html',
  styleUrls: ['./stock-modification.component.css']
})
export class StockModificationComponent {
  validateStock: FormGroup;
  response: string | undefined;
  stockId!: number;

  constructor(
    private authenticationService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.validateStock = new FormGroup({
      storeId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.stockId = params['stockId'];
      this.getStock(this.stockId);
    });
  }
  onSubmit(): void {
    this.response = "";
    if (this.validateStock.valid) {
      const storeId = this.validateStock.get('storeId')?.value;
      const productId = this.validateStock.get('productId')?.value;
      const quantity = this.validateStock.get('quantity')?.value;
      this.editStock(storeId, productId, quantity)
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }
  editStock(storeId: number, productId: number, quantity: number): void {
    //llamada al servicio{}
    this.router.navigate(["/stocks"]);
  }
  getStock(id: number): void {
    //llamada al servicio {}
    /*
      this.validateImage.patchValue({
        storeId: this.stock.storeId,
        productId: this.stock.productId,
        quantity: this.stock.quantity
      });
    */
  }
  index() {
    this.router.navigate(['/stores']);
  }
  logout() {
    this.authenticationService.logout();
  }
}
