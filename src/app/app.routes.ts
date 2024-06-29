import { Routes } from '@angular/router';
import { MenuprincipalComponent } from './Domains/Shared/Menu/component/menuprincipal/menuprincipal.component';
import { UsuarioComponent } from './Domains/Usuarios/component/usuario/usuario.component';
import { ProfileComponent } from './Domains/Profile/Component/profile/profile.component';
import { InicioComponent } from './Domains/Shared/Auth/Component/inicio/inicio.component';

export const routes: Routes = [
  {
    path: '',
    component: InicioComponent
  },
  {
    path: 'menuPrincipal',
    component: MenuprincipalComponent
  },
  {
    path: 'listUsuarios',
    component: UsuarioComponent
  },
  {
    path: 'listPerfil',
    component: ProfileComponent
  }
];
