export interface gymUsuarios{
  id: string,
  nombre: string;
  apellidos: string;
  email: string;
  password: string;
}

export type gymUsuarioDTO = Omit<gymUsuarios, 'password'>;
