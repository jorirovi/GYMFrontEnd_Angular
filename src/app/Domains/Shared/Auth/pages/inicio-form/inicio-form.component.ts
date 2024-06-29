import { Component, EventEmitter, Output } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { validateHeaderName } from 'http';
//ngImports
import { DialogModule } from 'primeng/dialog';
import { LoginModel } from '../../../../../Models/login.model';
@Component({
  selector: 'app-inicio-form',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule
  ],
  templateUrl: './inicio-form.component.html',
  styleUrl: './inicio-form.component.css'
})
export class InicioFormComponent {
  @Output() entityLogin = new EventEmitter()
  @Output() entityUsuario = new EventEmitter()
  @Output() entityCP = new EventEmitter()

  liEntity: LoginModel = {email: '', password: ''};
  formLogin!: FormGroup;
  formNuevoUsuario!: FormGroup;
  formCambiosPass!: FormGroup;
  visible: boolean = false;
  visibleMP: boolean = false;

  constructor(){
    this.buildFormLogin();
    this.buildFormNuevoUsuario();
    this.buildFormCambioPass();
  }
  buildFormLogin(){
    this.formLogin = new FormGroup({
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(8)])
    });
  }
  buildFormNuevoUsuario(){
    this.formNuevoUsuario = new FormGroup({
      nombre: new FormControl('',[Validators.required]),
      apellidos: new FormControl('',[Validators.required]),
      email: new FormControl('',[Validators.required, Validators.email]),
      password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    });
  }
  buildFormCambioPass(){
    this.formCambiosPass = new FormGroup({
      emailCP: new FormControl('',[Validators.required,Validators.email]),
      passwordCP: new FormControl('',[Validators.required, Validators.minLength(8)])
    });
  }

  onSubmit(event: Event){
    event.preventDefault();
    if(this.formLogin.valid){
      const loginEntity = this.formLogin.value;
      this.entityLogin.emit(loginEntity);
    }
  }

  onSave(event: Event){
    event.preventDefault();
    if(this.formNuevoUsuario.valid){
      const usuarioEntity = this.formNuevoUsuario.value
      this.visible = !this.visible
      this.entityUsuario.emit(usuarioEntity);
    }
  }

  onChangePass(event: Event){
    event.preventDefault();
    if(this.formCambiosPass.valid){
      //const cpEntity = this.formCambiosPass.getRawValue();
      this.liEntity.email = this.formCambiosPass.get('emailCP')?.value;
      this.liEntity.password = this.formCambiosPass.get('passwordCP')?.value;
      this.visibleMP = !this.visibleMP;
      this.entityCP.emit(this.liEntity);
    }
  }

  onHandleModalCU(){
    this.visible = !this.visible
  }

  onHandleModalMP(){
    this.visibleMP = !this.visibleMP
  }

}
