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
        console.log(rutinas)
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

}
