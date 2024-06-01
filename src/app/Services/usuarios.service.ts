import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Usuario } from '../Models/usuario.model';
import { gymUsuarios } from '../Models/gymUsuarios.model';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private http = inject(HttpClient);
  urlAPI = 'https://localhost:7206/api/Usuarios';
  constructor() { }

  getUsuarios(){
    return this.http.get<gymUsuarios[]>(this.urlAPI)
  }

  getUsuariosByID(id: number){
    return this.http.get<gymUsuarios>(`${this.urlAPI}/${id}`)
  }

  cambioPassword(email: string, password: string){
    return this.http.put<gymUsuarios>(`${this.urlAPI}/${email}/${password}`,{})
  }
}
