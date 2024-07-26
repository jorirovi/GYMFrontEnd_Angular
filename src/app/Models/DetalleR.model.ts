import { gymUsuarioDTO } from "./gymUsuarios.model";
import { RutinasModel } from "./rutina.model";
import { unidadpesomodel } from "./unidadpeso.model";
import { ZonaCorporal } from "./zonaCorporal.model";

export interface detallerutina{
  id: string;
  idRutina: string;
  rutina: RutinasModel;
  idUsuario: string;
  usuario: gymUsuarioDTO;
  zonaCorporal: number;
  dZonaCorporal: ZonaCorporal;
  ejercicio: string;
  maquina: string;
  peso: number;
  unidadPeso: number;
  unidad: unidadpesomodel;
  repeticiones: number;
  ilustracion: string;
}

export type detallerutinaDTO = Omit <detallerutina, 'rutina' | 'usuario' | 'dzonaCorporal' | 'unidad'>
