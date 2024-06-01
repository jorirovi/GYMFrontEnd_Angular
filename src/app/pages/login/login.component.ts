import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { LoginService } from '../../Services/login.service';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../../Models/login.model';
import { AuthModel } from '../../Models/auth.model';
import { Router } from '@angular/router';
import { DialogModule } from 'primeng/dialog';
import { UsuariosService } from '../../Services/usuarios.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, FormsModule, DialogModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginService = inject(LoginService);
  _usurioService = inject(UsuariosService)
  loginU: LoginModel = {
    email : '',
    password: ''
  };
  tokenU: AuthModel = {
    idU: '',
    email: '',
    token: ''
  };
  entity: LoginModel = {
    email: '',
    password: ''
  }
  email: string = '';
  pass: string = '';
  errorMessage: string | null = null;
  visible: boolean = false;

  constructor(private _route: Router){}

  getToken(){
    this.loginService.getAuth(this.loginU).subscribe({
      next: (token) => {
        this.tokenU = token;
        console.log(this.tokenU)
        this._route.navigate(['/usuarios'])
      },
      error: (error) => {
        this.errorMessage = error;
        alert(this.errorMessage)
      }
    });
  };
  showDialog() {
    this.visible = true;
  }
  changePass(entity: LoginModel){
    this._usurioService.cambioPassword(entity).subscribe({
      next: (usuario) => {
        console.log(usuario)
        this.visible = false
        alert('Password cambiado con exito')
      },
      error: (error) => {
        this.errorMessage = error;
        alert(this.errorMessage)
      }
    });
  }
}
