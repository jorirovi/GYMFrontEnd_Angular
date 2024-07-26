import { Component, Input, Output } from '@angular/core';
import { UnitPipe } from '../../../../../unit.pipe';
import { detallerutina } from '../../../../../Models/DetalleR.model';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

//PrimeNG Imports
import { MenubarModule } from 'primeng/menubar';
import { MenuItem } from 'primeng/api';




@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MenubarModule,
    UnitPipe,
    ReactiveFormsModule
  ],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.css'
})
export class MenuComponent {
  @Input() items: MenuItem[] | undefined;
  @Input() email: string = '';
  @Input() detalleR: detallerutina[] = [];

  frmfiltro!: FormGroup;
  frmfiltroZC!: FormGroup;
  drVisible: boolean = false;
  drzcVisible: boolean = true;
  filteredDetalleRutina = [...this.detalleR];

  constructor(){
    this.buildFormFiltro();
    this.buildFormFiltroZC();
  }
  buildFormFiltro(){
    this.frmfiltro = new FormGroup({
      rutina: new FormControl('',[Validators.required])
    });
  }
  buildFormFiltroZC(){
    this.frmfiltroZC = new FormGroup({
      zonaCorporal: new FormControl('',[Validators.required])
    });
  }

  onBuscarRutina(event: Event){
    event.preventDefault();
    if(this.frmfiltro.valid){
      this.drVisible = !this.drVisible;
      if(this.drzcVisible){
        this.drzcVisible = !this.drzcVisible;
      }
      const idRutina: string = this.frmfiltro.get('rutina')?.value;
      console.log(idRutina);
      this.filteredDetalleRutina = this.detalleR.filter(detalle => detalle.rutina.id === idRutina)
      console.log(this.filteredDetalleRutina)
    }
  }

  onBuscarRbyZC(event: Event){
    event.preventDefault();
    if(this.frmfiltroZC.valid){
      this.drzcVisible = !this.drzcVisible;
      if(this.drVisible){
        this.drVisible = !this.drVisible
      }
      const nZC: string = this.frmfiltroZC.get('zonaCorporal')?.value;
      console.log(nZC);
      this.filteredDetalleRutina = this.detalleR.filter(detalle => detalle.dZonaCorporal.id === nZC);
      console.log(this.detalleR);
      console.log(this.filteredDetalleRutina);
    }
  }
}
