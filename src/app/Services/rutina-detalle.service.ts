import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { detallerutina } from '../Models/DetalleR.model';
import { TokenService } from './token.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RutinaDetalleService {

  constructor() { }

  private _httpService = inject(HttpClient);
  private _tokenService = inject(TokenService)
  private APIurl = 'https://gymappjr.azurewebsites.net/api/DetalleRutina'


  getDRbyRutina(idR: string){
    return this._httpService.get<detallerutina[]>(`${this.APIurl}/rutina/${idR}`,{
      headers: {Authorization: `Bearer ${this._tokenService.getToken()}`}
    }).pipe(
      catchError(this.handleError)
    );
  }

  getDRbyUsuario(idU: string){
    return this._httpService.get<detallerutina[]>(`${this.APIurl}/usuario/${idU}`,{
      headers: {Authorization: `Bearer ${this._tokenService.getToken()}`}
    }).pipe(
      catchError(this.handleError)
    );
  }

  getDRbyZonaCorporal(nZC: number){
    return this._httpService.get<detallerutina[]>(`${this.APIurl}/zonacorporal/${nZC}`,{
      headers: {Authorization: `Bearer ${this._tokenService.getToken()}`}
    }).pipe(
      catchError(this.handleError)
    )
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
