import { Component, Input, OnInit, inject } from '@angular/core';
import { gymUsuarios } from '../../../../Models/gymUsuarios.model';
import { UsuariosService } from '../../../../Services/usuarios.service';
import { ListComponent } from './../../pages/list/list.component';
//PrimeNG Imports
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-usuario',
  standalone: true,
  imports: [
    ListComponent
  ],
  templateUrl: './usuario.component.html',
  styleUrl: './usuario.component.css'
})
export class UsuarioComponent implements OnInit {
  _gymUsuariosService = inject(UsuariosService);
  usuarios: gymUsuarios[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  usuario: gymUsuarios = {
    id: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: ''
  }

  ngOnInit(){
    this.items = [
      { label: 'Listado Usuarios' }
    ];
    this.home = {
      icon: 'pi pi-home',
      routerLink: '/menuPrincipal'
    };
    this._gymUsuariosService.getUsuarios().subscribe({
      next: (usuario) => {
        this.usuarios = usuario
      }
    });
  }

  buscarUsuarioByID(idU: string){
    this._gymUsuariosService.getUsuariosByID(idU).subscribe ({
      next: (usuarioEncontrado) => {
        this.usuario = usuarioEncontrado;
      }
    })
  }
}
