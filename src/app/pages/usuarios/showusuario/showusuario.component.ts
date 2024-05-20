import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-showusuario',
  standalone: true,
  imports: [],
  templateUrl: './showusuario.component.html',
  styleUrl: './showusuario.component.css'
})
export class ShowusuarioComponent {
  @Input() id: number = 0;
}
