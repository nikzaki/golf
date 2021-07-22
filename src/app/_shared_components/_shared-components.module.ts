import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";
import { DynamicFormComponent } from "./dynamic-form/dynamic-form.component";
import { DeleteModalComponent } from "./delete-modal/delete-modal.component";

@NgModule({
  declarations: [DynamicFormComponent, DeleteModalComponent],
  imports: [CommonModule, ReactiveFormsModule],
  exports: [DynamicFormComponent, DeleteModalComponent],
})
export class SharedComponentsModule { }
