import { Component, inject, signal } from '@angular/core';
import { UsuariosService } from '../../Services/usuarios.service';
import { Usuario } from '../../Models/usuario.model';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule } from '@angular/forms';


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

  usuarios = signal<Usuario[]>([]);
  usuarioDetail: Usuario = {
    id: 0,
    name: '',
    email: '',
    role: '',
    password: '',
    avatar: ''
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

  getIdUser(idU: number){
    this.usuarioService.getUsuariosByID(idU).subscribe({
      next: (usuarioD) => {
        this.usuarioDetail = usuarioD
        this.showUserVisible = true
        },
        error: () => {
        },
      });

  }

  showDialog(){
    this.showUserVisible = true;
  }
}
