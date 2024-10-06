import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { TiendasService } from 'src/app/services/tiendas.service';
import { StoreEdit } from 'src/app/models/storeEdit';
import { UsuarioService } from 'src/app/services/usuario.service';
import { ProductosService } from 'src/app/services/productos.service';

@Component({
  selector: 'app-store-modification',
  templateUrl: './store-modification.component.html',
  styleUrls: ['./store-modification.component.css']
})
export class StoreModificationComponent {
  validateStore: FormGroup;
  response: string | undefined;
  storeId!: number;
  usersList: number[] = [];
  productsList: number[] = [];

  constructor(
    private authenticationService: AuthService,
    private route: ActivatedRoute,
    private router: Router,
    private tiendasService: TiendasService,
    private usuarioService: UsuarioService,
    private productosService: ProductosService
  ) {
    this.validateStore = new FormGroup({
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
    this.getUsers();
    this.getProducts();
    this.route.params.subscribe(params => {
      this.storeId = params['storeId'];
      this.getStore(this.storeId);
    });
  }
  onSubmit(): void {
    this.response = "";
    if (this.validateStore.valid) {
      const code = this.validateStore.get('code')?.value;
      const address = this.validateStore.get('address')?.value;
      const city = this.validateStore.get('city')?.value;
      const province = this.validateStore.get('province')?.value;
      const usersId = this.validateStore.get('users')?.value;
      const productsId = this.validateStore.get('products')?.value;
      const enabled = this.validateStore.get('enabled')?.value === '1';
      this.editStore(code, address, city, province, usersId, productsId, enabled)
      console.log('Datos antes de llamar a editar tienda:', {
        code, address, city, province, usersId, productsId, enabled
    });
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }
  getUsers(){
    const username = '';
    const storeCode = '';
    this.usuarioService.obtenerUsuarios(username, storeCode).subscribe(
      (response) => {
          this.usersList = response.users; // Asume que la respuesta es un array de usuarios
      },
      (error) => {
          console.error('Error al obtener usuarios:', error);
      }
  );
  }
  getProducts(){
    this.productosService.obtenerProductos().subscribe({
      next: (response) => {
        this.productsList = response.products;
      },
      error: (error) => {
        console.error('Error al obtener productos', error);
      }
    });
  }
  editStore(code: string, address: string, city: string, province: string, usersId: number[], productsId: number[], enabled: boolean): void {
    const storeData: StoreEdit = {
      code,
      address,
      city,
      province,
      usersId,
      productsId,
      enabled
    };
    console.log('Datos enviados al backend:', storeData);
    this.tiendasService.editarTienda(this.storeId, storeData).subscribe(response => {
      if (response.success) {
        this.router.navigate(["/stores"]);
      } else {
        this.response = "Error al editar la tienda. Intente nuevamente.";
      }
    });
  }
  getStore(id: number): void {
    this.tiendasService.obtenerTiendaPorId(Number(id)).subscribe(store => {
      console.log('Datos obtenidos del backend para la tienda:', store);
      this.validateStore.patchValue({
        code: store.code,
        address: store.address,
        city: store.city,
        province: store.province,
        enabled: store.enabled ? '1' : '0',
        usersId: store.usersId || [],
        productsId: store.productsId || []
      });
    });
  }
  index() {
    this.router.navigate(['/stores']);
  }
  logout() {
    this.authenticationService.logout();
  }
}
