import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { gymUsuarioDTO } from '../../../../Models/gymUsuarios.model';
import { PerfilDTO } from '../../../../Models/perfil.model';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UnitPipe } from '../../../../unit.pipe';
//Imports NGPrime
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TokenService } from '../../../../Services/token.service';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { ConfirmPopupModule } from 'primeng/confirmpopup';
import { DialogModule } from 'primeng/dialog';

import { BreadcrumbModule } from 'primeng/breadcrumb';

@Component({
  selector: 'app-list-profile',
  standalone: true,
  imports: [
    TableModule,
    ButtonModule,
    ConfirmPopupModule,
    ReactiveFormsModule,
    DialogModule,
    UnitPipe,
    BreadcrumbModule
  ],
  templateUrl: './list-profile.component.html',
  styleUrl: './list-profile.component.css'
})
export class ListProfileComponent {
  _tokenService = inject(TokenService);
  _messageService = inject(MessageService);
  _confirmationService = inject(ConfirmationService);
  visibleForm: boolean = false;
  visiblePerfil: boolean = false;
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;

  //@Inputs
  @Input() listadoUsuarios: gymUsuarioDTO[] = [];
  @Input() perfilUsuario: PerfilDTO = {id: '', idUsuario: '', edad: 0, peso: 0, sexo: '', datosUsuario: {id: '', nombre:'', apellidos: '', email: ''}};
  //@outputs
  @Output() searchProfile = new EventEmitter;

  profileForm = new FormGroup({
    id: new FormControl<string>({value: '', disabled: true}),
    idusuario: new FormControl<string>({value: '', disabled: true}),
    edad: new FormControl<number>(0, [Validators.required, this.ageValidator]),
    peso: new FormControl<number>(0, [Validators.required, this.weigthValidator]),
    sexo: new FormControl<string | null>(null, Validators.required)
  });

  ngOnInit(){
    this.items = [{
      label: 'Perfil'
    }];
    this.home = {icon: 'pi pi-home', routerLink: '/menuPrincipal'}
  }
  private delay(ms: number): Promise<void>{
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async onViewProfile(usuario: gymUsuarioDTO, event: Event){
    const idU = usuario.id
    const idULoggin = this._tokenService.getIdU();
    if(idU === idULoggin){
      this.searchProfile.emit(idU);
      await this.delay(1500)
      if(this.perfilUsuario.id === ''){
        this._confirmationService.confirm({
          target: event.target as EventTarget,
          message: `¿${usuario.nombre.toUpperCase()} desea crear su perfil?`,
          header: 'Confirmación de Perfil de Usuario',
          icon: 'pi pi-exclamation-triangle',
          acceptIcon: "none",
          rejectIcon: "none",
          rejectButtonStyleClass:"p-button-text",
          accept: () => {
            this.visibleForm = !this.visibleForm;
          },
          reject: () => {
            this._messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected', life: 3000 })
          }
        });
      } else {
        this.visiblePerfil = !this.visiblePerfil;
      }
    }
    else
    {
      this._messageService.add({
        severity: 'error',
          summary: 'Error',
          detail: `Usted no puede ver el perfil de ${usuario.nombre}`,
          life: 3000
      });
    }
  }

  //validador del campo edad
  ageValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const age = control.value;
    if (age <= 10 || age >= 100) {
      return { 'invalidAge': true };
    }
    return null;
  }
  //validar del campo peso
  weigthValidator(control: AbstractControl): {[key: string]: boolean} | null {
    const weigth = control.value
    if (weigth <= 0){
      return {'invalidWeigth': true};
    }
    return null;
  }
}
