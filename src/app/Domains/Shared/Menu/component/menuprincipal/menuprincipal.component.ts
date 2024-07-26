import { Component, inject } from '@angular/core';
import { MenuComponent } from '../../pages/menu/menu.component';
import { MenuItem } from 'primeng/api';
import { gymUsuarioDTO } from '../../../../../Models/gymUsuarios.model';
import { UsuariosService } from '../../../../../Services/usuarios.service';
import { TokenService } from '../../../../../Services/token.service';
import { RutinaDetalleService } from '../../../../../Services/rutina-detalle.service';
import { detallerutina } from '../../../../../Models/DetalleR.model';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-menuprincipal',
  standalone: true,
  imports: [
    MenuComponent,
    CommonModule
  ],
  templateUrl: './menuprincipal.component.html',
  styleUrl: './menuprincipal.component.css'
})
export class MenuprincipalComponent {
  items: MenuItem[] | undefined;
  entityU: gymUsuarioDTO = {id: '', nombre: '', apellidos:'', email: ''};
  _usuarioService = inject(UsuariosService);
  _tokenService = inject(TokenService);
  _drService = inject(RutinaDetalleService);
  detalleRutina: detallerutina[] = []

  ngOnInit() {
    this.items = [
      {
        label: 'Maestros',
        icon: 'pi pi-clipboard',
        items: [
          {
            label: 'Perfil',
            icon: 'pi pi-user',
            routerLink: '/listPerfil'
          },
          {
            label: 'Usuarios',
            icon: 'pi pi-users',
            routerLink: '/listUsuarios'
          },
          {
            label: 'Zona Corporal',
            icon: 'pi pi-android',
            routerLink: '/listZonaCorporal'
          },
          {
            label: 'Rutinas',
            icon: 'pi pi-briefcase',
            routerLink: '/listRutinas'
          }
        ]
      },
      {
        label: 'Detalle Ruitnas',
        icon: 'pi pi-database',
        routerLink: '/detalleRutina'
      }
    ];
    this.onBuscarUsuario();
    this.onDetalleRutina();
  }

  onBuscarUsuario(){
    const idU: any = this._tokenService.getIdU();
    this._usuarioService.getUsuariosByID(idU).subscribe({
      next: (uEntity) => {
        this.entityU = uEntity;
      },
      error: (err) =>{
        alert(err.message)
      }
    });
  }

  onDetalleRutina(){
    const idU: any = this._tokenService.getIdU();
    this._drService.getDRbyUsuario(idU).subscribe({
      next: (datos) => {
        this.detalleRutina = datos;
      },
      error: (err) => {
        alert(err.message)
      }
    });
  }
}
