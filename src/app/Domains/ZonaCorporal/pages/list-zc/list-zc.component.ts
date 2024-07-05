import { Component, EventEmitter, Input, Output, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZonaCorporal } from '../../../../Models/zonaCorporal.model';
//ng Imports
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ToastModule } from 'primeng/toast';
import { ConfirmationService, MessageService } from 'primeng/api';
import { EliminarModel } from '../../../../Models/deletem.model';

@Component({
  selector: 'app-list-zc',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    TableModule,
    ButtonModule,
    RippleModule,
    ConfirmDialogModule,
    ToastModule
  ],
  templateUrl: './list-zc.component.html',
  styleUrl: './list-zc.component.css'
})
export class ListZCComponent {
  @Input() allZonasC: ZonaCorporal[] = [];
  @Input() mensajeOK = '';
  @Output() entityZC = new EventEmitter();
  @Output() eliminarZC = new EventEmitter();

  _confirmationService = inject(ConfirmationService);
  _messageService = inject(MessageService);

  formZC!: FormGroup;

  arrayZC = [
    {
      zc: 'Pierna',
      numeroZC: 1
    },
    {
      zc: 'Hombro',
      numeroZC: 2
    },
    {
      zc: 'Biceps',
      numeroZC: 3
    },
    {
      zc: 'Triceps',
      numeroZC: 4
    },
    {
      zc: 'Pecho',
      numeroZC: 5
    },
    {
      zc: 'Abs',
      numeroZC: 6
    },
    {
      zc: 'Pantorrilla',
      numeroZC: 7
    }
  ];
  visibleMCZC: boolean = false;

  constructor(){
    this.buildFormZC();

  }

  buildFormZC(){
    this.formZC = new FormGroup({
      id: new FormControl(''),
      zonaCorporal: new FormControl('',[Validators.required]),
      numeroZC: new FormControl('')
    });

    //this.formZC.valueChanges
    //  .subscribe(value => {
    //    console.log(value)
    //});
  }

  onSaveZC(event: Event){
    event.preventDefault();
    if(this.formZC.valid){
      if(this.allZonasC.length > 0){
        const zcNome: string = this.formZC.get('zonaCorporal')?.value;
        this.formZC.get('zonaCorporal')?.setValue(zcNome.toLowerCase());
        const valor = (this.allZonasC.length) - 1;
        const numeroZC = (this.allZonasC[valor].numeroZC) + 1;
        this.formZC.get('numeroZC')?.setValue(numeroZC);
        this.entityZC.emit(this.formZC.value);
        this.visibleMCZC = !this.visibleMCZC;
      } else {
        const zcNome: string = this.formZC.get('zonaCorporal')?.value;
        this.formZC.get('zonaCorporal')?.setValue(zcNome.toLowerCase());
        const numeroZC = 1;
        this.formZC.get('numeroZC')?.setValue(numeroZC);
        this.entityZC.emit(this.formZC.value);
        this.visibleMCZC = !this.visibleMCZC;
      }
    }
  }

  onSelectZC(zcEntity: ZonaCorporal, event: Event){
    console.log(zcEntity);
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: `Quiere eliminar el registro: ${zcEntity.zonaCorporal}`,
      header: 'Eliminar Zona Corporal',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
        this._messageService.add({
          severity: 'success',
          summary: 'confirmed',
          detail: `El Registro: ${zcEntity.zonaCorporal} fue eliminado!`,
          life: 5000
        });
        console.log(this.mensajeOK)
        this.eliminarZC.emit(zcEntity);

      },
      reject: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Cancelado',
          detail: "haz cancelado la eliminacion",
          life: 3000
        });
      }
    })
  }

  handleModalCZC(){
    this.visibleMCZC = !this.visibleMCZC;
  }
}
