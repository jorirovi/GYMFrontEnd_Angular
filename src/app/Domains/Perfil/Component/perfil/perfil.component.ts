import { Component, inject } from '@angular/core';
import { ListperfilComponent } from '../../Pages/listperfil/listperfil.component';
import { PerfilService } from '../../../../Services/perfil.service';
import { PerfilDTO } from '../../../../Models/perfil.model';
import { TokenService } from '../../../../Services/token.service';

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

  ngOnInit(){
    this.obtenerPerfilU(this._tokenService.getIdU());
  }
  obtenerPerfilU(idUsuario: string | any){
    this._perfilService.getPerfilbyIDU(idUsuario).subscribe ({
      next: (profile) => {
        this.perfil = profile;
        console.log(this.perfil);
      }
    });
  };

}
