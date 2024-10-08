import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { StockService } from 'src/app/services/stock.service';
import { Stock } from 'src/app/models/stock';

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
    private stockService: StockService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.validateStock = new FormGroup({
      id: new FormControl(''),
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
      const stock: Stock = {     
        id: this.validateStock.get('id')?.value,    
        storeId: this.validateStock.get('storeId')?.value,
        productId: this.validateStock.get('productId')?.value,
        quantity: this.validateStock.get('quantity')?.value,
      }
      this.editStock(stock)
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }
  editStock(stock: Stock): void {
    this.stockService.editarStock(stock).subscribe(response => {
      if (response.success) {
        this.router.navigate(["/stocks"]);
      } else {
        this.response = "El formulario contiene errores. Por favor, verifique los campos.";
      }
    });
  }
  getStock(id: number): void {
    this.stockService.obtenerStock(id).subscribe(response => {
      if (response.stock) {
        this.validateStock.patchValue({
          id: response.stock.id,
          storeId: response.stock.storeId,
          productId: response.stock.productId,
          quantity: response.stock.quantity
        });
      } else {
        this.response = "Stock no encontrado.";
      }
    }, error => {
      console.error("Error fetching store data:", error);
      this.response = "Error al obtener dato del stock.";
    });
  }
  index() {
    this.router.navigate(['/stocks']);
  }
  logout() {
    this.authenticationService.logout();
  }
}
