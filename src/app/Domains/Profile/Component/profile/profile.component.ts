import { Component, inject } from '@angular/core';
import { ProfileFormComponent } from '../../Pages/profile-form/profile-form.component';
import { PerfilService } from '../../../../Services/perfil.service';
import { Perfil, PerfilDTO } from '../../../../Models/perfil.model';
import { TokenService } from '../../../../Services/token.service';
import { gymUsuarioDTO } from '../../../../Models/gymUsuarios.model';
import { UsuariosService } from '../../../../Services/usuarios.service';
import { ListProfileComponent } from '../../Pages/list-profile/list-profile.component';
//Imports NGPrime
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    ProfileFormComponent,
    ListProfileComponent,
    ToastModule
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  _perfilService = inject(PerfilService);
  _tokenService = inject(TokenService);
  _usuarioService = inject(UsuariosService);
  _messageService = inject(MessageService);
  usuario: gymUsuarioDTO = {id: '', nombre: '', apellidos: '', email: ''};
  perfil: Perfil = {id: '', idUsuario: '',edad: 0, peso: 0, sexo: ''};
  perfilWU: PerfilDTO = {id: '', idUsuario: '', datosUsuario: {id: '', nombre: '', apellidos: '', email: ''}, edad: 0, peso: 0, sexo: ''};
  perfilAll: PerfilDTO[] = [];
  idUsuario: string | any;
  crearPerfil: boolean = false;
  listaUsuarios: gymUsuarioDTO[] = [];


  ngOnInit(){
    this.onObtenerListaUsuarios();
    //this.obtenerPerfil(this._tokenService.getIdU());
  }

  obtenerPerfil(idUsuario: any){
    this._perfilService.getAllPerfil().subscribe ({
      next: (arrayPerfiles) => {
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
      },
      error: (error) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: error.message,
          life: 3000
        });
      }
    });
  }

  onObtenerPerfilUsuario(idU: string){
    this._perfilService.getPerfilbyIDU(idU).subscribe({
      next: (perfil) => {
        this.perfilWU = perfil;
      },
      error: (err) => {
        if(err.message !== "El Registro buscado no existe!"){
          this._messageService.add({
            severity: 'error',
            summary: 'Error',
            detail: err.message,
            life: 3000
          });
        }
      }
    });
  }

  onObtenerListaUsuarios(){
    this._usuarioService.getUsuarios().subscribe({
      next: (listado) => {
        this.listaUsuarios = listado;
      }
    })
  }
  updatePerfil(perfilU: Perfil){
    this._perfilService.updatePerfil(perfilU).subscribe({
      next: (perfilcambiado) => {
        this.obtenerPerfil(perfilcambiado.idUsuario);
      },
      error: (err) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
          life: 3000
        });
      }
    });
  }

  createPerfil(perfilUEntity: Perfil){
    this._perfilService.addPerfil(perfilUEntity).subscribe({
      next: (perfilCreado) => {
        this.obtenerPerfil(perfilCreado.idUsuario);
      },
      error: (err) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err.message,
          life: 3000
        });
      }
    });
  }
}
