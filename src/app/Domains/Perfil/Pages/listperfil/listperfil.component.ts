import { Component, Input } from '@angular/core';
import { PerfilDTO } from '../../../../Models/perfil.model';
import { FormsModule } from '@angular/forms'
//PrimeNG
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-listperfil',
  standalone: true,
  imports: [
    TableModule,
    FormsModule
  ],
  templateUrl: './listperfil.component.html',
  styleUrl: './listperfil.component.css',
})
export class ListperfilComponent {
  @Input() perfilU: PerfilDTO = {
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
}


