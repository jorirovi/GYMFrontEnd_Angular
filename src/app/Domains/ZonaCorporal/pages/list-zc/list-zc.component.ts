import { Component, EventEmitter, Input, Output, inject, output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZonaCorporal } from '../../../../Models/zonaCorporal.model';
//ng Imports
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { DropdownModule } from 'primeng/dropdown';
import { BreadcrumbModule } from 'primeng/breadcrumb';

interface ZCs {
  zc: string;
  numeroZC: number
}

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
    DropdownModule,
    BreadcrumbModule
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

  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  arrayZC: ZCs[] = [
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

  ngOnInit(){
    this.items = [{
      label: 'Zona Corporal'
    }];
    this.home = {icon: 'pi pi-home', routerLink: '/menuPrincipal'}
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
        const zcNome: ZCs = this.formZC.get('zonaCorporal')?.value;
        let nuevaZC: string = zcNome.zc
        this.formZC.get('zonaCorporal')?.setValue(nuevaZC.toLowerCase());
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
