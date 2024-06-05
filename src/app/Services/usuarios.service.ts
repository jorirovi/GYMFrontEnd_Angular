import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { gymUsuarios } from '../Models/gymUsuarios.model';
import { LoginModel } from '../Models/login.model';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private http = inject(HttpClient);
  private _token = inject(TokenService)
  urlAPI = 'https://localhost:7206/api/UsuarioA';
  constructor() { }

  getUsuarios(){
    return this.http.get<gymUsuarios[]>(this.urlAPI,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    })
  }

  getUsuariosByID(id: string){
    return this.http.get<gymUsuarios>(`${this.urlAPI}/${id}`,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    })
  }

  cambioPassword(entity: LoginModel){
    return this.http.put<gymUsuarios>(`${this.urlAPI}/pass`,entity,{})
  }

  createUser(entity: gymUsuarios){
    return this.http.post<gymUsuarios>(this.urlAPI,entity,{})
  }
}
