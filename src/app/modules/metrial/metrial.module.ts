import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

// material modules
import { MatRadioModule } from "@angular/material/radio";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatButtonModule } from "@angular/material/button";
import {
  MatNativeDateModule,
  MatRippleModule,
  MAT_DATE_LOCALE,
} from "@angular/material/core";
import { MatDialogModule } from "@angular/material/dialog";
import { MatListModule } from "@angular/material/list";
import { MatSliderModule } from "@angular/material/slider";
import { MatCardModule } from "@angular/material/card";
import { MatSelectModule } from "@angular/material/select";
import { MatIconRegistry, MatIconModule } from "@angular/material/icon";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatMenuModule } from "@angular/material/menu";
import { MatTabsModule } from "@angular/material/tabs";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatSidenavModule } from "@angular/material/sidenav";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatTableModule } from "@angular/material/table";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatToolbarModule } from "@angular/material/toolbar";
import {
  MatBottomSheetModule,
  MatBottomSheetRef,
  MAT_BOTTOM_SHEET_DATA,
} from "@angular/material/bottom-sheet";
import { MatExpansionModule } from "@angular/material/expansion";
import { MatDividerModule } from "@angular/material/divider";
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatTreeModule } from "@angular/material/tree";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatChipsModule } from "@angular/material/chips";
import { MatStepperModule } from "@angular/material/stepper";
import { MatSortModule } from "@angular/material/sort";
import { MAT_MOMENT_DATE_ADAPTER_OPTIONS } from "@angular/material-moment-adapter";

const modules = [
  MatInputModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatAutocompleteModule,
  MatListModule,
  MatSliderModule,
  MatCardModule,
  MatSelectModule,
  MatButtonModule,
  MatIconModule,
  MatNativeDateModule,
  MatSlideToggleModule,
  MatCheckboxModule,
  MatMenuModule,
  MatTabsModule,
  MatTooltipModule,
  MatSidenavModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatTableModule,
  MatGridListModule,
  MatToolbarModule,
  MatBottomSheetModule,
  MatExpansionModule,
  MatDividerModule,
  MatSortModule,
  MatStepperModule,
  MatChipsModule,
  MatPaginatorModule,
  MatDialogModule,
  MatRippleModule,
  MatRadioModule,
  MatTreeModule,
  MatButtonToggleModule,
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // material modules
    ...modules,
  ],
  providers: [
    MatIconRegistry,
    { provide: MatBottomSheetRef, useValue: {} },
    { provide: MAT_BOTTOM_SHEET_DATA, useValue: {} },
    { provide: MAT_DATE_LOCALE, useValue: "en-GB" },
    { provide: MAT_MOMENT_DATE_ADAPTER_OPTIONS, useValue: { useUtc: true } },
  ],
  exports: [
    // material modules
    ...modules,
  ],
})
export class MetrialModule {}
