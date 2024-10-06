import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-stock-creation',
  templateUrl: './stock-creation.component.html',
  styleUrls: ['./stock-creation.component.css']
})
export class StockCreationComponent {
  validateStock: FormGroup;
  response: string | undefined;

  constructor(
    private authenticationService: AuthService,
    private router: Router
  ) {
    this.validateStock = new FormGroup({
      storeId: new FormControl('', [Validators.required]),
      productId: new FormControl('', [Validators.required]),
      quantity: new FormControl('', [Validators.required]),
    });
  }
  onSubmit(): void {
    this.response = "";
    if (this.validateStock.valid) {
      const storeId = this.validateStock.get('storeId')?.value;
      const productId = this.validateStock.get('productId')?.value;
      const quantity = this.validateStock.get('quantity')?.value;
      this.registerStock(storeId, productId, quantity)
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }
  registerStock(storeId: number, productId: number, quantity: number): void {
    //llamada al servicio{}
    this.router.navigate(["/stocks"]);
  }
  index() {
    this.router.navigate(['/stores']);
  }
  logout() {
    this.authenticationService.logout();
  }
}