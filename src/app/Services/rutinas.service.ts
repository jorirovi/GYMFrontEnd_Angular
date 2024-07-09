import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { RutinasModel } from '../Models/rutina.model';
import { TokenService } from './token.service';
import { catchError, throwError } from 'rxjs';
import { EliminarModel } from '../Models/deletem.model';

@Injectable({
  providedIn: 'root'
})
export class RutinasService {

  constructor() { }

  _httpService = inject(HttpClient);
  _tokenService = inject(TokenService);
  apiURL = 'https://gymappjr.azurewebsites.net/api/Rutinas';

  GetAllRutinas(){
    return this._httpService.get<RutinasModel[]>(this.apiURL,{
      headers: {Authorization: `Bearer ${this._tokenService.getToken()}`}
    }).pipe(
        catchError(this.handleError)
      );
  }

  GetRutinasByID(idR: string){
    return this._httpService.get<RutinasModel>(`${this.apiURL}/${idR}`,{
      headers: {Authorization: `Bearer ${this._tokenService.getToken}`}
    }).pipe(
        catchError(this.handleError)
    );
  }

  addRutinas(entity: RutinasModel){
    return this._httpService.post<RutinasModel>(this.apiURL,entity,{
      headers: {Authorization: `Bearer ${this._tokenService.getToken()}`}
    }).pipe(
        catchError(this.handleError)
    );
  }

  modifyRutinas(entity: RutinasModel){
    return this._httpService.put(this.apiURL,entity,{
      headers: {Authorization: `Bearer ${this._tokenService.getToken()}`}
    }).pipe(
        catchError(this.handleError)
    );
  }

  deleteRutinas(idR: string){
    return this._httpService.delete<EliminarModel>(`${this.apiURL}/${idR}`,{
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
