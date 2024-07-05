import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ZonaCorporal } from '../Models/zonaCorporal.model';
import { TokenService } from './token.service';
import { EliminarModel } from '../Models/deletem.model';

@Injectable({
  providedIn: 'root'
})
export class ZonacorporalService {

  private apiURL = 'https://gymappjr.azurewebsites.net/api/ZonaCorporal';
  private _http = inject(HttpClient);
  private _token = inject(TokenService);

  constructor() { }

  getAllZC(){
    return this._http.get<ZonaCorporal[]>(this.apiURL,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    });
  }

  addNewZC(entity: ZonaCorporal){
    return this._http.post<ZonaCorporal>(this.apiURL,entity,{
      headers: {Authorization: `Bearer ${this._token.getToken()}` }
    });
  }

  deleteZC(idZC: string){
    return this._http.delete<EliminarModel>(`${this.apiURL}/${idZC}`,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    });
  }


}
