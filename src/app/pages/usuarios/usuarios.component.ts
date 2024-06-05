import { Component, inject, signal } from '@angular/core';
import { UsuariosService } from '../../Services/usuarios.service';
import { Usuario } from '../../Models/usuario.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';
import { gymUsuarios } from '../../Models/gymUsuarios.model';


@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule,
    ButtonModule,
    TableModule,
    DialogModule,
    InputTextModule,
    FormsModule
  ],
  templateUrl: './usuarios.component.html',
  styleUrl: './usuarios.component.css'
})
export class UsuariosComponent {

  usuarios = signal<gymUsuarios[]>([]);
  usuarioDetail: gymUsuarios = {
    id: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: ''
  }
  private usuarioService = inject(UsuariosService);
  showUserVisible: boolean = false;

  ngOnInit(){
    this.usuarioService.getUsuarios().subscribe({
      next: (users) => {
        this.usuarios.set(users);
      },
      error: () => {
      },
    })
  }

  getIdUser(idU: string){
    this.usuarioService.getUsuariosByID(idU).subscribe({
      next: (usuarioD) => {
        this.usuarioDetail = usuarioD;
        },
        error: () => {
        },
      });
      this.showDialog();
  }

  showDialog(){
    this.showUserVisible = true;
  }
}
