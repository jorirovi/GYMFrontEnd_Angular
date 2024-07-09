import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { RutinasModel } from '../../../../Models/rutina.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
//PrimeNG Imports
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@Component({
  selector: 'app-rutinalist',
  standalone: true,
  imports: [
    BreadcrumbModule,
    TableModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    CommonModule,
    ConfirmDialogModule
  ],
  templateUrl: './rutinalist.component.html',
  styleUrl: './rutinalist.component.css'
})
export class RutinalistComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  formR!: FormGroup
  formVisible: boolean = false;
  private _confirmationService = inject(ConfirmationService);
  private _messageService = inject(MessageService);
  //@Inputs
  @Input() rutinas: RutinasModel[] = [];
  //@Outputs
  @Output() entityRutina = new EventEmitter();
  @Output() EliminarEntity = new EventEmitter();

  constructor(){
    this.buildFormRutinas();
  }

  ngOnInit(){
    this.items = [{
      label: 'Rutinas'
    }];
    this.home = {icon: 'pi pi-home', routerLink: '/menuPrincipal'}
  }

  buildFormRutinas(){
    this.formR = new FormGroup({
      id: new FormControl(''),
      rutina: new FormControl('',[Validators.required])
    });
  }

  onSelectRutinas(entity: RutinasModel, event: Event){
    this._confirmationService.confirm({
      target: event.target as EventTarget,
      message: `¿Desea elminar el registro ${entity.rutina}?`,
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triange',
      acceptIcon: "none",
      rejectIcon: "none",
      rejectButtonStyleClass: "p-button-text",
      accept: () => {
        this._messageService.add({
          severity: 'info',
          summary: 'Eliminacion de reqistro',
          detail: `¡Se Procede a eliminar ${entity.rutina}!`,
          life: 5000
        });
        this.EliminarEntity.emit(entity);
      },
      reject: () => {
        this._messageService.add({
          severity: 'error',
          summary: 'Eliminacion Cancelada',
          detail: '¡el registro no se eliminara!'
        });
      }
    });
  }

  onSaveRutina(event: Event){
    event.preventDefault();
    if(this.formR.valid){
      this.entityRutina.emit(this.formR.value);
      this.onFormRHandle();
    }
  }

  onFormRHandle(){
    this.formVisible = !this.formVisible;
    this.buildFormRutinas();
  }

}
