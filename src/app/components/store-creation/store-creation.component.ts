import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { TiendasService } from 'src/app/services/tiendas.service';
import { Store } from 'src/app/models/stores';

@Component({
  selector: 'app-store-creation',
  templateUrl: './store-creation.component.html',
  styleUrls: ['./store-creation.component.css']
})
export class StoreCreationComponent {
  validateStore: FormGroup;
  response: string | undefined;

  constructor(
    private authenticationService: AuthService,
    private tiendasService: TiendasService,
    private router: Router
  ) {
    this.validateStore = new FormGroup({
      code: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      address: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      city: new FormControl('', [Validators.required, Validators.maxLength(50)]),
      province: new FormControl('', [Validators.required, Validators.maxLength(50)]),    
      enabled: new FormControl(true),
    });
  }

  onSubmit(): void {
    this.response = "";
    if (this.validateStore.valid) {
      const storeData : Store = {
        code: this.validateStore.get('code')?.value,
        address: this.validateStore.get('address')?.value,
        city: this.validateStore.get('city')?.value,
        province: this.validateStore.get('province')?.value,
        enabled: this.validateStore.get('enabled')?.value === 1
      };
      this.registerStore(storeData);
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }

  registerStore(storeData: Store): void {
    this.tiendasService.crearTienda(storeData).subscribe(
      (response) => {
        this.router.navigate(['/stores']);
      },
      (error) => {
        this.response = "Ocurrió un error al crear la tienda.";
        console.error('Error al crear la tienda', error);
      }
    );
  }
  index() {
    this.router.navigate(['/stores']);
  }
  logout() {
    this.authenticationService.logout();
  }
}
