import { Component, EventEmitter, Input, Output } from '@angular/core';
import { gymUsuarios } from '../../../../Models/gymUsuarios.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
//PrimeNG Imports
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';





@Component({
  selector: 'app-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule,
    BreadcrumbModule,
    DialogModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css'
})
export class ListComponent {
  @Input() usuariosA: gymUsuarios[] = [];
  @Input() items: MenuItem[] | undefined;
  @Input() home: MenuItem | undefined;
  @Input() usuarioEncontrado: gymUsuarios = {
    id: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: ''
  };

  @Output() buscarUsuario = new EventEmitter();

  showUserVisible: boolean = false

  buscarUsuarioHanddler(idu: string){
    this.buscarUsuario.emit(idu);
    this.showDialog();
  }

  showDialog(){
    this.showUserVisible = !this.showUserVisible
  }
}
