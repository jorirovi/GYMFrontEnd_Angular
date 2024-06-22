import { gymUsuarioDTO } from './gymUsuarios.model'

export interface Perfil {
  id: string;
  idUsuario: string;
  edad: number;
  peso: number;
  sexo: string;
}

export interface PerfilDTO extends Perfil{
  datosUsuario: gymUsuarioDTO;
}
