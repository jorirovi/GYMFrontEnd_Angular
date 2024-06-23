import { Component, Input, signal } from '@angular/core';
import { PerfilDTO } from '../../../../Models/perfil.model';
import { FormsModule } from '@angular/forms';
import { gymUsuarios } from '../../../../Models/gymUsuarios.model';
import { CommonModule } from '@angular/common';
//PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';


@Component({
  selector: 'app-listperfil',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    InputTextModule,
    FloatLabelModule,
    CommonModule,
    ButtonModule
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
  @Input() usuarioGYM: gymUsuarios = {
    id: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: ''
  }

  @Input() cambioBoton: boolean | undefined;
}


