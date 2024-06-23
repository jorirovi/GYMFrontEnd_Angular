import { Component, inject, signal } from '@angular/core';
import { ListperfilComponent } from '../../Pages/listperfil/listperfil.component';
import { PerfilService } from '../../../../Services/perfil.service';
import { PerfilDTO } from '../../../../Models/perfil.model';
import { TokenService } from '../../../../Services/token.service';
import { gymUsuarios } from '../../../../Models/gymUsuarios.model';
import { UsuariosService } from '../../../../Services/usuarios.service';
import { TipoSexo } from '../../../../Models/tiposexo.model';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [
    ListperfilComponent
  ],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  private _perfilService = inject(PerfilService);
  private _tokenService = inject(TokenService);
  private _gymUsuariosService = inject(UsuariosService)
  perfil: PerfilDTO = {
    id: '',
    edad: 0,
    peso: 0,
    sexo: '',
    idUsuario: '',
    datosUsuario: {
      id: '',
      nombre:'',
      apellidos: '',
      email: ''
    }
  };
  usuario: gymUsuarios = {
    id: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: ''
  }
  tSexo: TipoSexo[] = []
  cBoton = false;

  ngOnInit(){
    this.obtenerPerfilU(this._tokenService.getIdU());
    this.tSexo = [{ sexo: 'Femenino' }, { sexo: 'Masculino' }];
  }
  obtenerPerfilU(idUsuario: string | any){
    this._gymUsuariosService.getUsuariosByID(idUsuario).subscribe ({
      next: (usuarioGym) => {
        this.usuario = usuarioGym
      },
      error: (error) => {
        error = "Error al Obtener el Usuario"
        alert(error)
      }
    });
    this._perfilService.getPerfilbyIDU(idUsuario).subscribe ({
      next: (profile) => {
        this.perfil = profile;
        this.cBoton = !this.cBoton
      },
      error: (error) => {
        error = "Error al Obtener el Perfil del Usuario"
        alert(error)
      }
    });
  };

}
