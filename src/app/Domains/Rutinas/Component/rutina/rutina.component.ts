import { Component, inject } from '@angular/core';
import { RutinalistComponent } from '../../Pages/rutinalist/rutinalist.component';
import { RutinasService } from '../../../../Services/rutinas.service';
import { RutinasModel } from '../../../../Models/rutina.model';
//PrimeNG Imports
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-rutina',
  standalone: true,
  imports: [
    RutinalistComponent,
    ToastModule
  ],
  templateUrl: './rutina.component.html',
  styleUrl: './rutina.component.css'
})
export class RutinaComponent {
  _rutinaService = inject(RutinasService);
  _messageService = inject(MessageService)
  todasRutinas: RutinasModel[] = [];

  constructor(){
    this.onObtenerRutinas();
  }

  onObtenerRutinas(){
    this._rutinaService.GetAllRutinas().subscribe({
      next: (rutinas) => {
        this.todasRutinas = rutinas;
      },
      error: (err) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err,
          life: 3000
        });
      }
    });
  }

  onCrearRutina(entity: RutinasModel){
    this._rutinaService.addRutinas(entity).subscribe({
      next: (rutinaN) => {
        this._messageService.add({
          severity: 'success',
          summary: 'registro Creado',
          detail: `Se crea el registro ${entity.rutina}`,
          life: 3000
        });
        this.onObtenerRutinas();
      },
      error: (err) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err,
          life: 3000
        });
      }
    });
  }

  onEliminarRutina(entity: RutinasModel){
    let parametro: string = entity.id
    console.log(parametro)
    this._rutinaService.deleteRutinas(parametro).subscribe({
      next: (mensajeE) => {
        this._messageService.add({
          severity: 'success',
          summary: 'Registro Eliminado',
          detail: mensajeE.message,
          life: 3000
        });
        this.onObtenerRutinas();
      },
      error: (err) => {
        this._messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: err,
          life: 3000
        });
      }
    });
  }

}
