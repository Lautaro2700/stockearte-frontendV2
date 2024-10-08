import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators} from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent{
  validateUser: FormGroup;
  response: string | undefined;
  constructor(
    private authService: AuthService
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
    //llamada al servicio de check user
    //llamada al servicio de get user
    //Se envia el id, si es null se envia 0
    this.authService.login(1);
    //response = data
  }
}
