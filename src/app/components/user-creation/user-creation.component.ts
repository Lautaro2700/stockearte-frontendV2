import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-user-creation',
  templateUrl: './user-creation.component.html',
  styleUrls: ['./user-creation.component.css']
})
export class UserCreationComponent {
  validateUser: FormGroup;
  response: string | undefined;

  constructor(
    private authenticationService: AuthService,
    private usuarioService: UsuarioService, 
    private router: Router
  ) {
    this.validateUser = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      firstName: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      lastName: new FormControl('', [Validators.required, Validators.maxLength(20)]),  
      storeId: new FormControl(),
      enabled: new FormControl('1'),
    });
  }
  onSubmit(): void {
    this.response = "";
    if (this.validateUser.valid) {
      const username = this.validateUser.get('username')?.value;
      const password = this.validateUser.get('password')?.value;
      const firstName = this.validateUser.get('firstName')?.value;
      const lastName = this.validateUser.get('lastName')?.value;
      const storeId = this.validateUser.get('storeId')?.value;
      const enabled = this.validateUser.get('enabled')?.value ===1;
      this.registerUser(username, password, firstName, lastName, storeId, enabled)
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }
  registerUser(username: string, password: string, firstName: string, lastName: string, storeId: number, enabled: boolean): void {
    const userData = {
      username,
      password,
      firstName,
      lastName,
      storeId,
      enabled
    };

    this.usuarioService.crearUsuario(userData).subscribe(
      response => {
        this.response = "Usuario creado exitosamente.";
        this.router.navigate(["/users"]);
      },
      error => {
        this.response = "Error al crear el usuario. " + error.message;
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
