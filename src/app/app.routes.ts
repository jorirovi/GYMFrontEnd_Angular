import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LabsComponent } from './pages/labs/labs.component';
import { CreatePassComponent } from './pages/create-pass/create-pass.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
export const routes: Routes = [
  {
    path: '',
    component: LoginComponent
  },
  {
    path: 'labs',
    component: LabsComponent
  },
  {
    path: 'create-pass',
    component: CreatePassComponent
  },
  {
    path: 'usuarios',
    component: UsuariosComponent
  }
];
