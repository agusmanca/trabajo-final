import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field'; 
import { MatSelectModule } from '@angular/material/select'; 
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from '@angular/material/slide-toggle'; 
import {MatButtonModule} from '@angular/material/button'; 
import {MatTableModule} from '@angular/material/table'; 
import {MatIconModule} from '@angular/material/icon';

@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule,
    BrowserAnimationsModule,
    MatSlideToggleModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule
  ]
})
export class MaterialModulesModule { }
