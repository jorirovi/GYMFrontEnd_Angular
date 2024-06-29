import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenService } from './token.service';
import { Perfil, PerfilDTO } from '../Models/perfil.model';
import { catchError, throwError } from 'rxjs';

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
    }).pipe(catchError(this.handleError));
  }

  addPerfil(entity: Perfil){
    return this._http.post<Perfil>(this.apiURl, entity,{
      headers: {authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(catchError(this.handleError));
  }

  updatePerfil(entity: Perfil){
    return this._http.put<Perfil>(this.apiURl, entity, {
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(catchError(this.handleError));
  }

  deletePerfil(idP: string){
    return this._http.delete(`${this.apiURl}/${idP}`,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(catchError(this.handleError));
  }

  getPerfilSolobyID(idP: string){
    return this._http.get<Perfil>(`${this.apiURl}/PerfilO/${idP}`,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(catchError(this.handleError));
  }

  getAllPerfil(){
    return this._http.get<PerfilDTO[]>(this.apiURl, {
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(catchError(this.handleError));
  }

  //manejador de errores
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente o de la red
      errorMessage = `${error.error.message}`;
    } else if (error.error) {
      // Error devuelto por el backend
      errorMessage = `${error.error.Message || error.error.message || error.message}`;
    } else {
      // Otro tipo de error
      errorMessage = `${error.status}\nMessage: ${error.message}`;
    }
    // Devuelve un observable con un mensaje de error amigable para el usuario
    return throwError(() => new Error(errorMessage));
  }
}
