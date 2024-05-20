import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { LoginModel } from '../Models/login.model';
import { AuthModel } from '../Models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  private http = inject(HttpClient)
  private apiURL = 'https://localhost:7206/api/Auth'

  getAuth(login: LoginModel){
    return this.http.post<AuthModel>(this.apiURL, login);
  }
}
