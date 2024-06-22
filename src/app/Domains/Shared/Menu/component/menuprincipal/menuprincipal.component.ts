import { Component } from '@angular/core';
import { MenuComponent } from '../../pages/menu/menu.component';
import { MenuItem } from 'primeng/api';



@Component({
  selector: 'app-menuprincipal',
  standalone: true,
  imports: [
    MenuComponent,
  ],
  templateUrl: './menuprincipal.component.html',
  styleUrl: './menuprincipal.component.css'
})
export class MenuprincipalComponent {
  items: MenuItem[] | undefined;

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
            icon: 'pi pi-android'
          }
        ]
      },
      {
        label: 'Detalle Ruitnas',
        icon: 'pi pi-database'
      }
    ];
  }
}
