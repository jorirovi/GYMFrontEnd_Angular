import { Component, Input } from '@angular/core';
import { RutinasModel } from '../../../../Models/rutina.model';
//PrimeNG Imports
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-rutinalist',
  standalone: true,
  imports: [
    BreadcrumbModule,
    TableModule,
    ButtonModule
  ],
  templateUrl: './rutinalist.component.html',
  styleUrl: './rutinalist.component.css'
})
export class RutinalistComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  //@Inputs
  @Input() rutinas: RutinasModel[] = [];

  ngOnInit(){
    this.items = [{
      label: 'Rutinas'
    }];
    this.home = {icon: 'pi pi-home', routerLink: '/menuPrincipal'}
  }

  onSelectRutinas(entity: RutinasModel, event: Event){
    console.log(event)
    console.log(entity)
  }

}
