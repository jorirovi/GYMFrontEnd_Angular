import { Component, inject } from '@angular/core';
import { ProfileFormComponent } from '../profile-form/profile-form.component';
import { PerfilService } from '../../../Services/perfil.service';
import { Perfil, PerfilDTO } from '../../../Models/perfil.model';
import { TokenService } from '../../../Services/token.service';
import { gymUsuarioDTO } from '../../../Models/gymUsuarios.model';
import { UsuariosService } from '../../../Services/usuarios.service';


@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileFormComponent,
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  _perfilService = inject(PerfilService);
  _tokenService = inject(TokenService);
  _usuarioService = inject(UsuariosService)
  usuario: gymUsuarioDTO = {id: '', nombre: '', apellidos: '', email: ''};
  perfil: Perfil = {id: '', idUsuario: '',edad: 0, peso: 0, sexo: ''};
  perfilWU: PerfilDTO = {id: '', idUsuario: '', datosUsuario: {id: '', nombre: '', apellidos: '', email: ''}, edad: 0, peso: 0, sexo: ''};
  perfilAll: PerfilDTO[] = [];
  idUsuario: string | any;
  crearPerfil: boolean = false;


  ngOnInit(){
    this.obtenerPerfil(this._tokenService.getIdU());
  }

  obtenerPerfil(idUsuario: string | any){
    this._perfilService.getAllPerfil().subscribe ({
      next: (arrayPerfiles) => {
        console.log(idUsuario)
        console.log(arrayPerfiles)
        arrayPerfiles.forEach(perfil => {
          if(perfil.idUsuario === idUsuario){
            this._perfilService.getPerfilbyIDU(perfil.idUsuario).subscribe({
              next: (perfilUsuario) => {
                this.perfilWU = perfilUsuario
                this.crearPerfil = false;
              }
            });
          }
          else {
            this._usuarioService.getUsuariosByID(idUsuario).subscribe({
              next: (usuarioSolo) => {
                this.usuario = usuarioSolo;
                this.crearPerfil = true
              }
            });
          }
        });
      }
    });
  }

  updatePerfil(perfilU: Perfil){
    this._perfilService.updatePerfil(perfilU).subscribe({
      next: (perfilcambiado) => {
        this.obtenerPerfil(perfilcambiado.idUsuario);
      },
      error: (err) => {
        alert(err);
      }
    });
  }

  createPerfil(perfilUEntity: Perfil){
    this._perfilService.addPerfil(perfilUEntity).subscribe({
      next: (perfilCreado) => {
        this.obtenerPerfil(perfilCreado.idUsuario);
      },
      error: (err) => {
        alert(err);
      }
    });
  }
}
