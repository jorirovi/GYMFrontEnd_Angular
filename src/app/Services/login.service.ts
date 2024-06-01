import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginModel } from '../Models/login.model';
import { AuthModel } from '../Models/auth.model';
import { tap } from 'rxjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }
  _tokenService = inject(TokenService)
  private http = inject(HttpClient)
  private apiURL = 'https://localhost:7206/api/Auth'

  getAuth(login: LoginModel){
    return this.http.post<AuthModel>(this.apiURL, login)
    .pipe(
      tap(
        response => this._tokenService.saveToken(response.token)
      ));
  }
}
