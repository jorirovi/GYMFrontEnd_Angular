import { Component, inject } from '@angular/core';
import { ListZCComponent } from '../../pages/list-zc/list-zc.component';
import { ZonaCorporal } from '../../../../Models/zonaCorporal.model';
import { ZonacorporalService } from '../../../../Services/zonacorporal.service';
//PrimeNG Imports
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-zona-corporal',
  standalone: true,
  imports: [
    ListZCComponent,
    ToastModule
  ],
  templateUrl: './zona-corporal.component.html',
  styleUrl: './zona-corporal.component.css'
})
export class ZonaCorporalComponent {
  _zcService = inject(ZonacorporalService)
  _messageService = inject(MessageService)
  ZonasCorporales: ZonaCorporal[] = [];

  constructor(){
    this.onCargarZC()
  }

  onCargarZC(){
    this._zcService.getAllZC().subscribe({
      next: (zc) => {
        this.ZonasCorporales = zc;
        console.log(zc);
      },
      error: (error) => {
        this._messageService.add({severity: 'error', summary: 'Error', detail: error.message})
      }
    });
  }

  onCrearZC(entityZC: ZonaCorporal){
    this._zcService.addNewZC(entityZC).subscribe({
      next: (nuevaZC) => {
        this.onCrearZC
      },
      error: (error) => {
        alert()
      }
    })
  }
}


