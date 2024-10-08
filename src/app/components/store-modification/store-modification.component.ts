import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { TiendasService } from 'src/app/services/tiendas.service';
import { StoreEdit } from 'src/app/models/storeEdit';
import { ProductosService } from 'src/app/services/productos.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Product } from 'src/app/models/product';

@Component({
  selector: 'app-store-modification',
  templateUrl: './store-modification.component.html',
  styleUrls: ['./store-modification.component.css']
})
export class StoreModificationComponent {
  validateStore: FormGroup;
  response: string | undefined;
  storeId!: number;
  usersList: any[] = [];
  productsList: any[] = [];

  constructor(
    private authenticationService: AuthService,
    private tiendaService: TiendasService,
    private productosService: ProductosService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.validateStore = new FormGroup({
      storeId: new FormControl(''),
      code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      province: new FormControl('', [Validators.required, Validators.maxLength(50)]),    
      users: new FormControl([], Validators.required),
      products: new FormControl([], Validators.required), 
      enabled: new FormControl('1'),
    });
  }
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.storeId = params['storeId'];
      this.getStore(this.storeId);
    });
  }
  onSubmit(): void {
    this.response = "";
    if (this.validateStore.valid) {
      const store: StoreEdit = {
        storeId: this.validateStore.get('storeId')?.value, 
        code: this.validateStore.get('code')?.value,
        address: this.validateStore.get('address')?.value,
        city: this.validateStore.get('city')?.value,
        province: this.validateStore.get('province')?.value,
        usersId: this.validateStore.get('users')?.value,
        productsId: this.validateStore.get('products')?.value,
        enabled: this.validateStore.get('enabled')?.value,
      };
      this.editStore(store);
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }
  editStore(store: StoreEdit): void {
    this.tiendaService.editarTienda(store).subscribe(response => {
      if (response.success) {
        this.router.navigate(["/stores"]);
      } else {
        this.response = "El formulario contiene errores. Por favor, verifique los campos.";
      }
    });
  }
  getUsers() {
    this.usuarioService.obtenerUsuarios('', '').subscribe(
      (response) => {
        this.usersList = response.users;
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  getStore(id: number): void {
    this.tiendaService.obtenerTiendaPorId(id).subscribe(response => {
      if (response.store) {
        this.validateStore.patchValue({
          storeId: response.store.storeId,
          code: response.store.code,
          address: response.store.address,
          city: response.store.city,
          province: response.store.province,
          enabled: response.store.enabled ? '1' : '0'
        });
      const selectedUserIds = response.store.usersId || [];
      const selectedProductIds = response.store.productsId || [];
      this.loadUsersAndPatch(selectedUserIds);
      this.loadProductsAndPatch(selectedProductIds);
      } else {
        this.response = "Tienda no encontrada.";
      }
    }, error => {
      console.error("Error fetching store data:", error);
      this.response = "Error al obtener datos de la tienda.";
    });
  }
  loadUsersAndPatch(selectedUserIds: number[]): void {
    this.usuarioService.obtenerUsuarios('', '').subscribe(
      (userResponse) => {
        this.usersList = userResponse.users;
        const selectedUsers = this.usersList
          .filter(user => selectedUserIds.includes(Number(user.userId)))
          .map(user => user.userId); 
        this.validateStore.get('users')?.setValue(selectedUsers); 
      },
      (error) => {
        console.error('Error al obtener usuarios:', error);
      }
    );
  }
  loadProductsAndPatch(selectedProductIds: number[]): void {
    const requestBody: Product = {
      nombre: "GetAllList"
    };
    this.productosService.filtrarProducto(requestBody).subscribe({
      next: (response) => {
        this.productsList = response.products;
        const selectedProducts = this.productsList
          .filter(product => selectedProductIds.includes(Number(product.id)))
          .map(product => product.id); 
        this.validateStore.get('products')?.setValue(selectedProducts);
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
      }
    });
  }
  index() {
    this.router.navigate(['/stores']);
  }
  logout() {
    this.authenticationService.logout();
  }
}