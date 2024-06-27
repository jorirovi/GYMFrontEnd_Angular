import { Component, EventEmitter, Input, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { PerfilDTO } from '../../../Models/perfil.model';
import { gymUsuarioDTO } from '../../../Models/gymUsuarios.model';
//NGPrime
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FieldsetModule } from 'primeng/fieldset';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    InputTextModule,
    ButtonModule,
    FieldsetModule,
    BreadcrumbModule
  ],
  templateUrl: './profile-form.component.html',
  styleUrl: './profile-form.component.css'
})
export class ProfileFormComponent {
  @Input() perfilWUEntity: PerfilDTO = {id: '', idUsuario: '', datosUsuario: {id: '', nombre:'', apellidos:'', email: ''}, edad: 0, peso: 0, sexo: ''};
  @Input() usuarioSolo: gymUsuarioDTO = {id: '', nombre: '', apellidos: '', email: ''};
  @Input() idUsuarioSP: string | any;
  @Input() crearPerfilH: boolean = false;
  @Output() perfilEnviado = new EventEmitter();
  @Output() perfilEnviadoC = new EventEmitter();

  cabezeraFormularioP = ''
  visible: boolean = false;
  items: MenuItem[] | undefined;
  home: MenuItem | undefined;
  profileForm = new FormGroup({
    id: new FormControl<string>({value: '', disabled: true}),
    idusuario: new FormControl<string>({value: '', disabled: true}),
    edad: new FormControl<number>(0, [Validators.required, this.ageValidator]),
    peso: new FormControl<number>(0, [Validators.required, this.weigthValidator]),
    sexo: new FormControl<string | null>(null, Validators.required)
  });

  profileFormC = new FormGroup({
    id: new FormControl<string>({value: '', disabled: true}),
    idusuario: new FormControl<string>({value:'', disabled: true}, Validators.required),
    edad: new FormControl<number>(0, [Validators.required, this.ageValidator]),
    peso: new FormControl<number>(0, [Validators.required, this.weigthValidator]),
    sexo: new FormControl<string>('', Validators.required)
  });

  perfilCompleto = new FormGroup({
    nombre: new FormControl<string>({value: '', disabled: true}),
    apellidos: new FormControl<string>({value: '', disabled: true}),
    email: new FormControl<string>({value: '', disabled: true}),
    edad: new FormControl<number>({value: 0, disabled: true}),
    peso: new FormControl<number>({value: 0, disabled: true }),
    sexo: new FormControl<string | null>({value: null, disabled: true}, Validators.required)
  });
  //al momento de cargar carga el menu
  ngOnInit(){
    this.items = [{
      label: 'Perfil'
    }];
    this.home = {icon: 'pi pi-home', routerLink: '/menuPrincipal'}
  }

  //carga la informacion en el formulario base
  ngOnChanges(changes: SimpleChanges): void {
    if(this.crearPerfilH === false){
      if (changes['perfilWUEntity'] && changes['perfilWUEntity'].currentValue) {
        this.profileForm.setValue({
          id: this.perfilWUEntity.id,
          idusuario: this.perfilWUEntity.idUsuario,
          edad: this.perfilWUEntity.edad,
          peso: this.perfilWUEntity.peso,
          sexo: this.perfilWUEntity.sexo || ''
        });
        this.perfilCompleto.setValue({
          nombre: this.perfilWUEntity.datosUsuario.nombre,
          apellidos: this.perfilWUEntity.datosUsuario.apellidos,
          email: this.perfilWUEntity.datosUsuario.email,
          edad: this.perfilWUEntity.edad,
          peso: this.perfilWUEntity.peso,
          sexo: this.perfilWUEntity.sexo || ''
        });
        this.cabezeraFormularioP = `${this.perfilWUEntity.datosUsuario.nombre} ${this.perfilWUEntity.datosUsuario.apellidos}`
      }
    } else {
      if(changes['usuarioSolo'] && changes['usuarioSolo'].currentValue){
        this.profileFormC.setValue({
          id: '',
          idusuario: this.usuarioSolo.id,
          edad: 0,
          peso: 0,
          sexo: ''
        });
        this.perfilCompleto.setValue({
          nombre: this.usuarioSolo.nombre,
          apellidos: this.usuarioSolo.apellidos,
          email: this.usuarioSolo.email,
          edad: 0,
          peso: 0,
          sexo: ''
        });
        this.cabezeraFormularioP = `${this.usuarioSolo.nombre} ${this.usuarioSolo.apellidos}`
      }
    }
  }

  onHandlePerfil(){
    this.visible = !this.visible
  }
  //envia objeto para ser alamcenado en la API
  onSubmit(event: Event){
    event.preventDefault();
    if(!this.crearPerfilH){
      if(this.profileForm.valid){
        const formValues = this.profileForm.getRawValue();
        this.perfilEnviado.emit(formValues);
        this.onHandlePerfil();
      }
    } else {
      if(this.profileFormC.valid){
        const formValuesC = this.profileFormC.getRawValue();
        this.perfilEnviadoC.emit(formValuesC);
        this.onHandlePerfil();
      }
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
