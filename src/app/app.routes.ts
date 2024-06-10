import { Routes } from '@angular/router';
import { LoginComponent } from './Domains/Shared/Auth/pages/login/login.component';
import { MenuprincipalComponent } from './Domains/Shared/Menu/component/menuprincipal/menuprincipal.component';
import { UsuarioComponent } from './Domains/Usuarios/component/usuario/usuario.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'menuPrincipal',
    component: MenuprincipalComponent
  },
  {
    path: 'listUsuarios',
    component: UsuarioComponent
  }
];
