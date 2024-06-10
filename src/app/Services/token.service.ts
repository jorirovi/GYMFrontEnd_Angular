import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor() { }

  saveToken(token: string, id: string){
    localStorage.setItem('token', token);
    localStorage.setItem('idU', id);
  }

  getToken(){
    const token = localStorage.getItem('token')
    return token
  }

  getIdU(){
    const id = localStorage.getItem('idU')
    return id
  }
}
