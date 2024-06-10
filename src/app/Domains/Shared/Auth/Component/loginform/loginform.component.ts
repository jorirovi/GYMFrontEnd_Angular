import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LoginService } from '../../../../../Services/login.service';
import { UsuariosService } from '../../../../../Services/usuarios.service';
import { LoginModel } from '../../../../../Models/login.model';
import { AuthModel } from '../../../../../Models/auth.model';
import { gymUsuarios } from '../../../../../Models/gymUsuarios.model';
//Prime Imports
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { DialogModule } from 'primeng/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginform',
  standalone: true,
  imports: [
    CardModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    InputGroupAddonModule,
    InputTextModule,
    InputGroupModule
  ],
  templateUrl: './loginform.component.html',
  styleUrl: './loginform.component.css'
})
export class LoginformComponent {
  _loginService = inject(LoginService);
  _usurioService = inject(UsuariosService);
  _router = inject(Router)
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
  nuevoUsuario: gymUsuarios = {
    id: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: ''
  }
  email: string = '';
  pass: string = '';
  errorMessage: string | null = null;
  visibleFP: boolean = false;
  visibleSU: boolean = false;

  constructor(){}

  getToken(){
    this._loginService.getAuth(this.loginU).subscribe({
      next: (token) => {
        this.tokenU = token;
        console.log(this.tokenU)
        this._router.navigate(['/menuPrincipal'])
      },
      error: (error) => {
        this.errorMessage = error;
        alert(this.errorMessage)
      }
    });
  };

  showDialogCP(){
    this.visibleFP = !this.visibleFP
  }

  showDialogSU(){
    this.visibleSU = !this.visibleSU
  }

  changePass(entity: LoginModel){
    this._usurioService.cambioPassword(entity).subscribe({
      next: (usuario) => {
        console.log(usuario)
        this.showDialogCP()
        alert('Password cambiado con exito')
      },
      error: (error) => {
        this.errorMessage = error;
        alert(this.errorMessage)
      }
    });
  }

  newUser(nuevoUsuario: gymUsuarios){
    this._usurioService.createUser(nuevoUsuario).subscribe({
      next: (usuario) => {
        console.log(usuario)
        this.showDialogSU()
        alert("Usuario creado con exito!")
      },
      error: (error) => {
        this.errorMessage = error
        alert(this.errorMessage)
      }
    });
  }
}
