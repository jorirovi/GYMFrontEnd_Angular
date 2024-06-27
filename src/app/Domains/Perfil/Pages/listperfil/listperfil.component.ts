import { Component, ElementRef, EventEmitter, Input, Output, ViewChildren, inject } from '@angular/core';
import { Perfil, PerfilDTO } from '../../../../Models/perfil.model';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
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
    ListboxModule,
    ReactiveFormsModule
  ],
  templateUrl: './listperfil.component.html',
  styleUrl: './listperfil.component.css',
})
export class ListperfilComponent {
  formPerfilM!: FormGroup;
  _formBuilder = inject(FormBuilder)
  constructor(){
    this.buildFormPerfil();
  }
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

  private buildFormPerfil(){
    this.formPerfilM = this._formBuilder.group({
      edad: ['', [Validators.required], Validators.min(1), Validators.max(100)],
      peso: ['',[Validators.required], Validators.min(0)],
      sexo: ['',[Validators.required]]
    });
  }
  handleDialog(idP: string){
    this.buscarPerfil.emit(idP)
    this.showDialog = !this.showDialog
    this.kSex = [{tipo: 'Femenino'}, {tipo: 'Masculino'}]
  }
  handleBotonMGuardar(event: Event){
    event.preventDefault();
    const value = this.formPerfilM.value
    console.log(value)
    this.showDialog = !this.showDialog
  }
}


