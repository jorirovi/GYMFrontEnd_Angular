import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Usuario } from '../Models/usuario.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private http = inject(HttpClient);

  constructor() { }

  getUsuarios(){
    return this.http.get<Usuario[]>('https://api.escuelajs.co/api/v1/users')
  }

  getUsuariosByID(id: number){
    return this.http.get<Usuario>(`https://api.escuelajs.co/api/v1/users/${id}`)
  }
}
