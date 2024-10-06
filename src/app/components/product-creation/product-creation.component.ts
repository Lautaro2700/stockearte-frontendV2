import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { ProductosService } from 'src/app/services/productos.service';
import { TiendasService } from 'src/app/services/tiendas.service';
import { Store } from 'src/app/models/stores';

@Component({
  selector: 'app-product-creation',
  templateUrl: './product-creation.component.html',
  styleUrls: ['./product-creation.component.css']
})
export class ProductCreationComponent {
  validateProduct: FormGroup;
  response: string | undefined;
  storesList: Store[] = [];

  constructor(
    private authenticationService: AuthService,
    private productosService: ProductosService,
    private tiendasService: TiendasService,
    private router: Router
  ) {
    this.validateProduct = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      size: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      color: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      photo: new FormControl(),
      stores: new FormControl([], Validators.required),
    });
  }
  ngOnInit() {
    this.getStores();
  }
  getStores(){
    this.storesList = [];
    this.tiendasService.obtenerTiendas().subscribe(
      response => {
        this.storesList = response.stores;
      },
      error => {
        console.error('Error al obtener las tiendas:', error);
      }
    );
  }
  onSubmit(): void {
    this.response = "";
    if (this.validateProduct.valid) {
      const name = this.validateProduct.get('name')?.value;
      const size = this.validateProduct.get('size')?.value;
      const color = this.validateProduct.get('color')?.value;
      const photo = this.validateProduct.get('photo')?.value;
      const selectedStores = this.validateProduct.get('stores')?.value;
    if (selectedStores && selectedStores.length > 0) {
      const idTienda = selectedStores;
      this.registerProduct(name, size, color, photo, idTienda);
    } else {
      this.response = "Debes seleccionar al menos una tienda.";
    }
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }
  registerProduct(nombre: string, talle: string, color: string, foto: string, idTienda: string[]): void {
    const productData = { nombre, talle, color, foto, idTienda };
    console.log(productData);
    this.productosService.crearProductos(productData).subscribe(
      (response) => {
        this.response = "Producto creado exitosamente.";
        this.router.navigate(["/products"]);
      },
      (error) => {
        this.response = "Error al crear el producto.";
      }
    );
  }
  logout() {
    this.authenticationService.logout();
  }
}
