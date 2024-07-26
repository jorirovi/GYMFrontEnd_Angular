import { Component, Input, inject } from '@angular/core';
import { detallerutina } from '../../../../Models/DetalleR.model';

import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TokenService } from '../../../../Services/token.service';
//NGPrime Imports
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';
import { ZonaCorporal } from '../../../../Models/zonaCorporal.model';
import { RutinasModel } from '../../../../Models/rutina.model';
import { unidadpesomodel } from '../../../../Models/unidadpeso.model';

@Component({
  selector: 'app-drlist',
  standalone: true,
  imports: [
    TableModule,
    ReactiveFormsModule,
    DialogModule
  ],
  templateUrl: './drlist.component.html',
  styleUrl: './drlist.component.css'
})
export class DRListComponent {
  @Input() detalle: detallerutina[] = [];
  @Input() zc: ZonaCorporal[] = [];
  @Input() rutina: RutinasModel[] = [];
  @Input() unidad: unidadpesomodel[] = [];
  
  private _tokenService = inject(TokenService);
  frmDR!: FormGroup;
  formularioV: boolean = false;
  constructor(){
    this.onBuildFormDR();
  }

  onBuildFormDR(){
    this.frmDR = new FormGroup({
      id: new FormControl<string>(''),
      idRutina: new FormControl<string>('',[Validators.required]),
      idUsuario: new FormControl<string>(''),
      zonaCorporal: new FormControl<number>(0,[Validators.required, Validators.min(1)]),
      ejercicio: new FormControl<string>('',[Validators.required]),
      maquina: new FormControl<string>('',[Validators.required]),
      peso: new FormControl<number>(0,[Validators.required, Validators.min(1)]),
      unidad: new FormControl<number>(0,[Validators.required, Validators.min(1)]),
      repeticiones: new FormControl<number>(0,[Validators.required,Validators.min(1)]),
      ilustracion: new FormControl<string>('')
    });
  }

  onHandleDialog(){
    this.formularioV = !this.formularioV;
  }

  onSubmitData(event: Event){
    event.preventDefault();
    if(this.frmDR.valid){
      this.onHandleDialog();
      const idU: any = this._tokenService.getIdU();
      this.frmDR.setValue({idUsuario: idU});
      console.log(this.frmDR.value);
    }
  }
}
