import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatSelectModule } from '@angular/material/select';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatBadgeModule } from '@angular/material/badge';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';

import { DragDropModule } from '@angular/cdk/drag-drop';
import { MAT_DATE_FORMATS } from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'DD MMM YYYY',
  },
  display: {
    dateInput: 'DD MMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@NgModule({
  imports: [
    CommonModule,
    MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule,
    MatListModule, MatCardModule, MatProgressBarModule, MatInputModule,
    MatSnackBarModule, MatProgressSpinnerModule, MatDatepickerModule,
    MatAutocompleteModule, MatTableModule, MatDialogModule, MatTabsModule,
    MatTooltipModule, MatSelectModule, MatPaginatorModule, MatChipsModule,
    MatButtonToggleModule, MatSlideToggleModule, MatSliderModule, MatBadgeModule, MatCheckboxModule,
    MatExpansionModule, DragDropModule, MatSortModule, MatRadioModule, MatFormFieldModule
  ],
  exports: [
    CommonModule,
    MatSidenavModule, MatIconModule, MatToolbarModule, MatButtonModule,
    MatListModule, MatCardModule, MatProgressBarModule, MatInputModule,
    MatSnackBarModule, MatMenuModule, MatProgressSpinnerModule, MatDatepickerModule,
    MatAutocompleteModule, MatTableModule, MatDialogModule, MatTabsModule,
    MatTooltipModule, MatSelectModule, MatPaginatorModule, MatChipsModule,
    MatButtonToggleModule, MatSlideToggleModule, MatSliderModule, MatBadgeModule, MatCheckboxModule,
    MatExpansionModule, DragDropModule, MatSortModule, MatRadioModule, MatFormFieldModule
  ],
  providers: [
    {
      provide: MAT_DATE_FORMATS,
      useValue: MY_FORMATS
    },
    { provide: LOCALE_ID, useValue: 'en-gb' }
  ]
})
export class MaterialModule {
  static forRoot() {
    return {
      ngModule: MaterialModule,
      providers: [
      ]
    };
  }
}
