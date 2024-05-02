import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatToolbarModule} from '@angular/material/toolbar'
import {MatButtonModule} from '@angular/material/button'
import {MatCardModule} from '@angular/material/card'
import {MatTableModule} from '@angular/material/table'
import {MatFormFieldModule} from '@angular/material/form-field'
import {MatIconModule} from '@angular/material/icon'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatInputModule} from '@angular/material/input'
import {MatGridListModule} from '@angular/material/grid-list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatSelectModule} from '@angular/material/select';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSliderModule} from '@angular/material/slider';
import {MatDividerModule} from '@angular/material/divider';




import { FormsModule } from '@angular/forms';
import {MatDatepickerModule} from '@angular/material/datepicker';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatInputModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
    MatDividerModule,

    FormsModule,

    MatDatepickerModule
  ],
  exports: [
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatPaginatorModule,
    MatInputModule,
    MatGridListModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCheckboxModule,
    MatSliderModule,
    MatDividerModule,
    FormsModule,
    MatDatepickerModule
  ]
})
export class MaterialModule { }
