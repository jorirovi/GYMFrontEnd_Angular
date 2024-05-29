import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { LoginService } from '../../Services/login.service';
import { FormsModule } from '@angular/forms';
import { LoginModel } from '../../Models/login.model';
import { AuthModel } from '../../Models/auth.model';
import { Router } from '@angular/router'


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, CardModule, ButtonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginService = inject(LoginService);
  loginU: LoginModel = {
    email : '',
    password: ''
  };
  tokenU: AuthModel = {
    idU: '',
    email: '',
    token: ''
  }
  errorMessage: string | null = null;

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
}
