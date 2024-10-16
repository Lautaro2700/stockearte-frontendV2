import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  validateUser: FormGroup;
  response: string | undefined;
  constructor(
    private authService: AuthService,
    private http: HttpClient
  ) {
    this.validateUser = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.maxLength(20)]),
      password: new FormControl('', [Validators.required, Validators.maxLength(12)])
    });
  }
  onSubmit(): void {
    if (this.validateUser.valid) {
      const username = this.validateUser.get('username')?.value;
      const password = this.validateUser.get('password')?.value;
      this.checkUser(username, password);
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }
  checkUser(username: string, password: string): void {
    this.http.post<any>('http://localhost:5000/user/authenticate', { username, password })
    .subscribe(response => {
      if (response.success) {
        const storeId = response.storeId !== null && response.storeId !== undefined ? response.storeId : 0;
        console.log(response)
        console.log("Tienda: "+ storeId)
        this.authService.login(storeId);
      } else {
        this.response = 'Usuario o contraseña incorrectos.';
      }
    }, error => {
      this.response = 'Error en la autenticación. Inténtelo de nuevo.';
    });
  }
}
