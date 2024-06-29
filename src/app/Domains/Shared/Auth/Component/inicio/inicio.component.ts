import { Component, inject } from '@angular/core';
import { InicioFormComponent } from '../../pages/inicio-form/inicio-form.component';
import { TokenService } from '../../../../../Services/token.service';
import { UsuariosService } from '../../../../../Services/usuarios.service';
import { LoginService } from '../../../../../Services/login.service';
import { gymUsuarios } from '../../../../../Models/gymUsuarios.model';
import { LoginModel } from '../../../../../Models/login.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [InicioFormComponent],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.css'
})
export class InicioComponent {
  _tokenService = inject(TokenService);
  _usuarioService = inject(UsuariosService);
  _loginService = inject(LoginService);
  _router = inject(Router)

  usuarioE: gymUsuarios = {id: '', nombre: '', apellidos: '', email: '', password: ''};
  loginNU: LoginModel = {email:'', password:''};
  loginCP: LoginModel = {email:'', password: ''};

  onLogin(loginE: LoginModel){
    this._loginService.getAuth(loginE).subscribe({
      next: () => {
        this._router.navigate(['/menuPrincipal'])
      },
      error: (error) => {
        alert(error.message)
      }
    });
  }

  onCreateNewUser(usuarioE: gymUsuarios){
    //usuarioE.id = '';
    const pass = usuarioE.password
    this._usuarioService.createUser(usuarioE).subscribe({
      next: (usuarioCreado) => {
        this.loginNU.email = usuarioCreado.email;
        this.loginNU.password = pass;
        this._loginService.getAuth(this.loginNU).subscribe({
          next: () => {
            this._router.navigate(['/menuPrincipal']);
          },
          error: (err) => {
            alert(err.message);
          }
        });
      },
      error: (err) => {
        alert(err.message)
      }
    });
  }

  onChangePassword(modPassEntity: LoginModel){
    this._usuarioService.cambioPassword(modPassEntity).subscribe ({
      next: () => {
        alert('Cambio de Password Exitoso');
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }
}
