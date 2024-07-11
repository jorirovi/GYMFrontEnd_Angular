import { Component, Input, inject } from '@angular/core';
import { gymUsuarioDTO } from '../../../../Models/gymUsuarios.model';
//Imports NGPrime
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TokenService } from '../../../../Services/token.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-profile',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule
  ],
  templateUrl: './list-profile.component.html',
  styleUrl: './list-profile.component.css'
})
export class ListProfileComponent {
  _tokenService = inject(TokenService);
  _messageService = inject(MessageService);

  //@Inputs
  @Input() listadoUsuarios: gymUsuarioDTO[] = [];

  onViewProfile(usuario: gymUsuarioDTO){
    const idU = usuario.id
    const idULoggin = this._tokenService.getIdU();
    if(idU === idULoggin){
      alert('se mostrara el perfil usuario');
    }
    else
    {
      this._messageService.add({
        severity: 'error',
          summary: 'Error',
          detail: `Usted no puede ver el perfil de ${usuario.nombre}`,
          life: 3000
      })
    }
  }
}
