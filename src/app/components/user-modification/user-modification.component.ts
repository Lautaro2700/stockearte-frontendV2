import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth-service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { User } from 'src/app/models/user';
import { UserEdit } from 'src/app/models/userEdit'; 

@Component({
  selector: 'app-user-modification',
  templateUrl: './user-modification.component.html',
  styleUrls: ['./user-modification.component.css']
})
export class UserModificationComponent {
  validateUser: FormGroup;
  response: string | undefined;
  userId!: number;

  constructor(
    private authenticationService: AuthService,
    private usuarioService: UsuarioService,
    private route: ActivatedRoute,
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
  ngOnInit() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
      this.getUser(this.userId);
    });
  }
  onSubmit(): void {
    this.response = "";
    if (this.validateUser.valid) {
      const usuario: User = {
        userId: this.userId,
        username: this.validateUser.get('username')?.value,
        password: this.validateUser.get('password')?.value,
        firstName: this.validateUser.get('firstName')?.value,
        lastName: this.validateUser.get('lastName')?.value,
        storeId: this.validateUser.get('storeId')?.value,
        enabled: this.validateUser.get('enabled')?.value === '1',
    };
    this.editUser(usuario);
    } else {
      this.response = "El formulario contiene errores. Por favor, verifique los campos.";
    }
  }
  editUser(usuario: User): void {
    this.usuarioService.editarUsuario(usuario).subscribe(response => {
      if (response.success) {
          this.router.navigate(["/users"]);
      } else {
          this.response = response.error;
      }
  });
  }
  getUser(id: number): void {
    this.usuarioService.obtenerUsuariosPorId(id).subscribe(response => {
      if (response.user) {
          this.validateUser.patchValue({
              username: response.user.username,
              password: response.user.password,
              firstName: response.user.firstName,
              lastName: response.user.lastName,
              storeId: response.user.storeId,
              enabled: response.user.enabled ? '1' : '0'
          });
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
