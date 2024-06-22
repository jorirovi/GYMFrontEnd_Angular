import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { Perfil, PerfilDTO } from '../Models/perfil.model';

@Injectable({
  providedIn: 'root'
})
export class PerfilService {

  constructor() { }
  private _http = inject(HttpClient)
  private _token = inject(TokenService)
  private apiURl = "https://gymappjr.azurewebsites.net/api/Perfil"

  getPerfilbyIDU(uID: string){
    return this._http.get<PerfilDTO>(`${this.apiURl}/${uID}`,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    });
  }

}
