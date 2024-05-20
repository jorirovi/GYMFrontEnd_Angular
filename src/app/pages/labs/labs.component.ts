import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-labs',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './labs.component.html',
  styleUrl: './labs.component.css'
})
export class LabsComponent {
  welcome = 'Bienvenido a mi primera aplicación de Angular!';
  usuarios = [
    'Jorge Romero Villarreal',
    'Angelig Corona Polanco'
  ];
  nombre = signal('Jorge');
  edad = 45;
  disabled = false;
  img = 'https://res-console.cloudinary.com/dhvv1pzeo/thumbnails/v1/image/upload/v1715795028/SU1HXzEwNDdfeGdlbWp3/drilldown';

  persona = {
    nombre : "Jorge",
    apellido : "Romero Villarreal",
    edad : 45,
    foto : "https://res-console.cloudinary.com/dhvv1pzeo/thumbnails/v1/image/upload/v1715795028/SU1HXzEwNDdfeGdlbWp3/drilldown"
  }

  clickHandler(){
    alert("Hola")
  }

  changeHandler(event: Event){
    const input = event.target as HTMLInputElement;
    const newInput = input.value;
    this.nombre.set(newInput);
  }

  keydownHandler(event: KeyboardEvent){
    const input = event.target as HTMLInputElement;
    console.log(input.value)
  }
}
