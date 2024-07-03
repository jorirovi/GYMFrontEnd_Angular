import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ZonaCorporal } from '../../../../Models/zonaCorporal.model';
//ng Imports
import { DialogModule } from 'primeng/dialog';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-list-zc',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    DialogModule,
    TableModule
  ],
  templateUrl: './list-zc.component.html',
  styleUrl: './list-zc.component.css'
})
export class ListZCComponent {
  @Input() allZonasC: ZonaCorporal[] = []

  formZC!: FormGroup;

  arrayZC = [
    {
      zc: 'Pierna',
      numeroZC: 1
    },
    {
      zc: 'Hombro',
      numeroZC: 2
    },
    {
      zc: 'Biceps',
      numeroZC: 3
    },
    {
      zc: 'Triceps',
      numeroZC: 4
    },
    {
      zc: 'Pecho',
      numeroZC: 5
    },
    {
      zc: 'Abs',
      numeroZC: 6
    }
  ];
  visibleMCZC: boolean = false;

  constructor(){
    this.buildFormZC();
  }

  buildFormZC(){
    this.formZC = new FormGroup({
      id: new FormControl(''),
      zonaCorporal: new FormControl('',[Validators.required]),
      numeroZC: new FormControl('')
    });

    //this.formZC.valueChanges
    //  .subscribe(value => {
    //    console.log(value)
    //});
  }

  onSaveZC(event: Event){
    event.preventDefault();
    if(this.formZC.valid){
      const valorBuscado = this.formZC.get('zonaCorporal')?.value;
      const index = this.arrayZC.findIndex(a => a.zc === valorBuscado);
      this.formZC.get('numeroZC')?.setValue(this.arrayZC[index].numeroZC);
      console.log(this.formZC.value);
    }

  }

  handleModalCZC(){
    this.visibleMCZC = !this.visibleMCZC;
  }
}
