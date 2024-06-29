import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { gymUsuarios } from '../Models/gymUsuarios.model';
import { LoginModel } from '../Models/login.model';
import { TokenService } from './token.service';
import { catchError, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {

  private http = inject(HttpClient);
  private _token = inject(TokenService)
  urlAPI = 'https://gymappjr.azurewebsites.net/api/UsuarioA';
  urlAPI_ = 'https://gymappjr.azurewebsites.net/api/Usuarios'
  constructor() { }

  getUsuarios(){
    return this.http.get<gymUsuarios[]>(this.urlAPI,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(
      catchError(this.handleError)
    );
  }

  getUsuariosByID(id: string){
    return this.http.get<gymUsuarios>(`${this.urlAPI}/${id}`,{
      headers: {Authorization: `Bearer ${this._token.getToken()}`}
    }).pipe(
      catchError(this.handleError)
    );
  }

  cambioPassword(entity: LoginModel){
    return this.http.put<gymUsuarios>(`${this.urlAPI_}/pass`,entity,{})
    .pipe(
      catchError(this.handleError)
    );
  }

  createUser(entity: gymUsuarios){
    return this.http.post<gymUsuarios>(this.urlAPI_,entity,{})
    .pipe(
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
