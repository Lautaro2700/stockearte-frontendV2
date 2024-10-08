import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { ProductosService } from 'src/app/services/productos.service';
import { Product } from 'src/app/models/product';
import { TiendasService } from 'src/app/services/tiendas.service';

@Component({
  selector: 'app-product-modification',
  templateUrl: './product-modification.component.html',
  styleUrls: ['./product-modification.component.css']
})
export class ProductModificationComponent {
  validateProduct: FormGroup;
  response: string | undefined;
  productId!: number;
  storesList: any[] = [];

  constructor(
    private authenticationService: AuthService,
    private route: ActivatedRoute,
    private productosService: ProductosService,
    private tiendasService: TiendasService,
    private router: Router
  ) {
    this.validateProduct = new FormGroup({
      id: new FormControl(''),
      nombre: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      talle: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      foto: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      color: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      stock: new FormControl(),
      codigo: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      idTienda: new FormControl([], Validators.required),  // Use 'idTienda' here
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.productId = params['productId'];
      this.getProduct(this.productId);
    });
  }
  onSubmit(): void {
    this.response = "";
    if (this.validateProduct.valid) {
      const product: Product = {
        id: this.validateProduct.get('id')?.value, 
        codigo: this.validateProduct.get('codigo')?.value,
        nombre: this.validateProduct.get('nombre')?.value,
        talle: this.validateProduct.get('talle')?.value,
        color: this.validateProduct.get('color')?.value,
        foto: this.validateProduct.get('foto')?.value,
        stock: this.validateProduct.get('stock')?.value,
        idTienda: this.validateProduct.get('idTienda')?.value,
      };
      this.editProduct(product);
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }
  editProduct(product: Product): void {
    this.productosService.editProduct(product).subscribe(response => {
      if (response) {
        this.router.navigate(["/products"]);
      } else {
        this.response = "El formulario contiene errores. Por favor, verifique los campos.";
      }
    });
  }
  getProduct(id: number): void {
    const requestBody: Product = {
        id: id
    };
    this.productosService.getProductDetail(requestBody).subscribe(response => {
        if (response) {
          this.validateProduct.patchValue({
              id: response.id,
              codigo: response.codigo,
              nombre: response.nombre,
              talle: response.talle,
              color: response.color,
              foto: response.foto,
              stores: response.idTienda || [] 
          });
          const selectedStoreIds = response.idTienda || [];
          this.loadStoresAndPatch(selectedStoreIds);
        } else {
            this.response = "Producto no encontrado.";
        }
    }, error => {
        console.error("Error fetching product data:", error);
        this.response = "Error al obtener datos del producto.";
    });
  }
  loadStoresAndPatch(selectedStoreIds: number[]): void {
    this.tiendasService.obtenerTiendas().subscribe({
      next: (response) => {
        this.storesList = response.stores;
        const selectedStores = this.storesList
          .filter(store => selectedStoreIds.includes(Number(store.storeId)))
          .map(store => store.storeId); 
        this.validateProduct.get('idTienda')?.setValue(selectedStores);
      },
      error: (error) => {
        console.error('Error al obtener tiendas', error);
      }
    });
  }
  logout() {
    this.authenticationService.logout();
  }
}