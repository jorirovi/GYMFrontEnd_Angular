import { Component, ElementRef, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { Perfil, PerfilDTO } from '../../../../Models/perfil.model';
import { FormsModule } from '@angular/forms';
import { gymUsuarios } from '../../../../Models/gymUsuarios.model';
import { CommonModule } from '@angular/common';
//PrimeNG
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { InputNumberModule } from 'primeng/inputnumber';
import { ListboxModule } from 'primeng/listbox';
import { TipoSexo } from '../../../../Models/tiposexo.model';

interface sexo {
  tipo: string
}

@Component({
  selector: 'app-listperfil',
  standalone: true,
  imports: [
    FormsModule,
    CardModule,
    InputTextModule,
    FloatLabelModule,
    CommonModule,
    ButtonModule,
    DialogModule,
    InputNumberModule,
    ListboxModule
  ],
  templateUrl: './listperfil.component.html',
  styleUrl: './listperfil.component.css',
})
export class ListperfilComponent {
  @ViewChildren('edadInput') edadInput!: ElementRef;
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
  };
  @Input() perfilEntity: Perfil = {
    id: '',
    idUsuario: '',
    edad: 0,
    peso: 0,
    sexo: ''
  };
  @Input() cambioBoton: boolean | undefined;
  @Input() tipoSexo: TipoSexo[] = [];
  @Output() buscarPerfil = new EventEmitter();
  showDialog: boolean = false;
  valorErrado: boolean = false;
  kSex!: sexo[]
  selectedSex!: sexo;

  handleDialog(idP: string){
    this.buscarPerfil.emit(idP)
    this.showDialog = !this.showDialog
    this.kSex = [{tipo: 'Femenino'}, {tipo: 'Masculino'}]
  }
  handleBotonGuardar(){
    if(this.selectedSex.tipo !== null){
      this.perfilEntity.sexo = this.selectedSex.tipo;
      console.log(this.perfilEntity);
      this.showDialog = !this.showDialog;
    }
    else{
      alert("Por favor debe seleccionar un tipo de sexo");
    }

  }
}


