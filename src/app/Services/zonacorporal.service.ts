import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ZonaCorporal } from '../Models/zonaCorporal.model';
import { TokenService } from './token.service';
import { EliminarModel } from '../Models/deletem.model';
import { catchError, throwError } from 'rxjs';

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
    }).pipe(catchError(this.handleError));
  }

  addNewZC(entity: ZonaCorporal){
    return this._http.post<ZonaCorporal>(this.apiURL,entity,{
      headers: {Authorization: `Bearer ${this._token.getToken()}` }
    }).pipe(catchError(this.handleError));
  }

  deleteZC(idZC: string){
    return this._http.delete<EliminarModel>(`${this.apiURL}/${idZC}`,{
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
