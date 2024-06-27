import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { Perfil, PerfilDTO } from '../Models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor() { }
  private _http = inject(HttpClient);
  private _token = inject(TokenService);
  private apiURl = "https://gymappjr.azurewebsites.net/api/Perfil";

  getPerfilbyIDU(uID: string){
    return this._http.get<PerfilDTO>(`${this.apiURl}/${uID}`,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    });
  }

  addPerfil(entity: Perfil){
    return this._http.post<Perfil>(this.apiURl, entity,{
      headers: {authorization: `Bearer ${this._token.getToken()}`}
    });
  }

  updatePerfil(entity: Perfil){
    return this._http.put<Perfil>(this.apiURl, entity, {
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    });
  }

  deletePerfil(idP: string){
    return this._http.delete(`${this.apiURl}/${idP}`,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    });
  }

  getPerfilSolobyID(idP: string){
    return this._http.get<Perfil>(`${this.apiURl}/PerfilO/${idP}`,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    });
  }

  getAllPerfil(){
    return this._http.get<PerfilDTO[]>(this.apiURl, {
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    });
  }
}
