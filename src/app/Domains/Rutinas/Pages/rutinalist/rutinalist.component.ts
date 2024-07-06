import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-rutinalist',
  standalone: true,
  imports: [
    BreadcrumbModule
  ],
  templateUrl: './rutinalist.component.html',
  styleUrl: './rutinalist.component.css'
})
export class RutinalistComponent {
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;


  ngOnInit(){
    this.items = [{
      label: 'Rutinas'
    }];
    this.home = {icon: 'pi pi-home', routerLink: '/menuPrincipal'}
  }

}
