import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service';
import { User } from 'src/app/models/user';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UsuarioService } from 'src/app/services/usuario.service';
import { UserEdit } from 'src/app/models/userEdit';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css']
})
export class ManageUsersComponent {
  users : User[] = [];
  filteredUsers: User[] = [];
  filterForm: FormGroup;
  activeFilter: boolean = false;
  showElement: boolean = false;
  constructor(
    private authenticationService: AuthService,
    private usuarioService: UsuarioService,
    private router: Router
  ){
    this.filterForm = new FormGroup({
      filter: new FormControl("", [Validators.required, Validators.pattern(/^[^<>]+$/)])
    });
  }
  ngOnInit() {
    const storeId = localStorage.getItem('storeId');
    this.showElement = storeId == '0'
    this.getUsers();
  }
  getUsers(){
    const username = '';
    const storeCode = '';
    this.usuarioService.obtenerUsuarios(username, storeCode).subscribe(
      (response) => {
          this.users = response.users; // Asume que la respuesta es un array de usuarios
          this.filteredUsers = this.users;
      },
      (error) => {
          console.error('Error al obtener usuarios:', error);
      }
  );
  }
  searchUser() {
    const searchTerm = this.filterForm.get('filter')?.value.toLowerCase();
    if (searchTerm) {
      this.filteredUsers = this.users.filter(user => 
        (user.username?.toLowerCase().includes(searchTerm) || '' )|| 
        (user.storeCode?.toLowerCase().includes(searchTerm) || '')
      );
    } else {
      this.filteredUsers = this.users;
    }
    this.activeFilter = true;;
  }
  cleanFilter() {
    this.filteredUsers = this.users;
    this.activeFilter = false;
    this.filterForm.get('filter')?.setValue('');
  }
  disableUser(id: number, username: string, password: string, firstName: string, lastName: string, storeId: number, enabled: boolean): void {
    const user: UserEdit = {
      userId: id,
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName,
      storeId: storeId,
      enabled: enabled,
    };
    console.log(user)
    this.usuarioService.editarUsuario(user).subscribe(response => {
      if (response.success) {
        this.getUsers()
      }
    });  
  }
  createUser(){
    this.router.navigate(['/user/creation']);
  }
  logout(){
    this.authenticationService.logout();
  }
}
