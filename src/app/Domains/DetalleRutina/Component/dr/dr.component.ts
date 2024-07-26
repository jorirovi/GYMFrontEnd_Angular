import { Component, inject } from '@angular/core';
import { RutinasService } from '../../../../Services/rutinas.service';
import { ZonacorporalService } from '../../../../Services/zonacorporal.service';
import { UnidadService } from '../../../../Services/unidad.service';
import { RutinaDetalleService } from '../../../../Services/rutina-detalle.service';
import { TokenService } from '../../../../Services/token.service';
import { detallerutina } from '../../../../Models/DetalleR.model';
import { DRListComponent } from '../../Page/drlist/drlist.component';
import { CommonModule } from '@angular/common';
import { UsuariosService } from '../../../../Services/usuarios.service';
//ngPrime Imports
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';
import { gymUsuarioDTO } from '../../../../Models/gymUsuarios.model';
import { ZonaCorporal } from '../../../../Models/zonaCorporal.model';
import { unidadpesomodel } from '../../../../Models/unidadpeso.model';
import { RutinasModel } from '../../../../Models/rutina.model';


@Component({
  selector: 'app-dr',
  standalone: true,
  imports: [
    DRListComponent,
    CommonModule,
    BreadcrumbModule
  ],
  templateUrl: './dr.component.html',
  styleUrl: './dr.component.css'
})
export class DRComponent {
  _rutinaService = inject(RutinasService);
  _zonaCService = inject(ZonacorporalService);
  _unidadService = inject(UnidadService);
  _detalleR = inject(RutinaDetalleService);
  _tokenService = inject(TokenService);
  _usurioService = inject(UsuariosService);

  detallesRutina: detallerutina[] = [];
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  usuario: gymUsuarioDTO = {id: '', nombre: '', apellidos: '', email:''};
  znasCorp: ZonaCorporal[] = [];
  unidades: unidadpesomodel[] = [];
  rutines: RutinasModel[] = [];

  constructor(){
    this.onObtenerDetalleR();
    this.onObtenerRutina();
    this.onObtenerUsuario();
    this.onObtenerZC();
    this.onObtenerUnidades();
  }

  ngOnInit(){
    this.items = [
      {label: 'Detalle Rutinas'}
    ];
    this.home = {icon: 'pi pi-home', routerLink: '/menuPrincipal'};
  }

  onObtenerDetalleR(){
    const idU: any = this._tokenService.getIdU()
    this._detalleR.getDRbyUsuario(idU).subscribe({
      next: (datos) => {
        this.detallesRutina = datos;
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }

  onObtenerUsuario(){
    const idU: any = this._tokenService.getIdU();
    this._usurioService.getUsuariosByID(idU).subscribe({
      next: (datos) => {
        this.usuario = datos;
      },
      error :(err) => {
        alert(err.message);
      }
    });
  }

  onObtenerZC(){
    this._zonaCService.getAllZC().subscribe({
      next: (zonasCorporales) => {
        this.znasCorp = zonasCorporales;
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }

  onObtenerUnidades(){
    this._unidadService.getUnidades().subscribe({
      next: (unidades) => {
        this.unidades = unidades;
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }

  onObtenerRutina(){
    this._rutinaService.GetAllRutinas().subscribe({
      next: (rutinas) => {
        this.rutines = rutinas;
      },
      error: (err) => {
        alert(err.message);
      }
    });
  }
}
