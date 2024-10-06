import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Observable } from "rxjs";
import { User } from "../models/user";
import { UserEdit } from "../models/userEdit"; 

@Injectable({
    providedIn: 'root'
})

export class UsuarioService {
    private readonly baseApiUrl = 'http://localhost:5000/user';

    constructor(private http: HttpClient){}

  obtenerUsuarios(username: string = '', storeCode: string = ''): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/getUsers`, { username, storeCode });
  }

  crearUsuario(usuario: User): Observable<any> {
    return this.http.post(`${this.baseApiUrl}/create`, usuario);
  }

  editarUsuario(usuario: User): Observable<any>{
    return this.http.post(`${this.baseApiUrl}/edit`, usuario);
  }

  obtenerUsuariosPorId(userId: number): Observable<{ user: UserEdit }>{
    return this.http.post<{ user: UserEdit }>(`${this.baseApiUrl}/getUser`, { userId: Number(userId) });
  }
}