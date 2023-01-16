import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModulesModule } from './material-modules.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
  ], 
  exports:[
    FormsModule,
    ReactiveFormsModule,
    MaterialModulesModule,
  ]
})
export class SharedModule { }
