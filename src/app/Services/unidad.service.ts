import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { unidadpesomodel } from '../Models/unidadpeso.model';
import { TokenService } from './token.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UnidadService {

  constructor() { }

  private _http = inject(HttpClient);
  private _tokenService = inject(TokenService);
  private urlAPI = 'https://gymappjr.azurewebsites.net/api/Unidad';

  getUnidades(){
    return this._http.get<unidadpesomodel[]>(this.urlAPI,{
      headers: {Authorization: `Bearer ${this._tokenService.getToken()}`}
    }).pipe(
      catchError(this.handleError)
    );
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
