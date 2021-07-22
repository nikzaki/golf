import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { SponsorManagementRoutingModule } from "./sponsor-management-routing.module";
import { MetrialModule } from "../metrial/metrial.module";
import { CRUDTableModule } from "src/app/_metronic/shared/crud-table";
import { SharedComponentsModule } from "src/app/_shared_components/_shared-components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { InlineSVGModule } from "ng-inline-svg";
import { ListSponsorsResolver, SponsorDetailResolver } from "./_resolvers/sponsor-resolvers-index";
import {
  ListSponsorsComponent,
  AddEditSponsorComponent,
} from "./_components/sponsors-components-index";

@NgModule({
  declarations: [ListSponsorsComponent, AddEditSponsorComponent],
  imports: [
    CommonModule,
    SponsorManagementRoutingModule,
    MetrialModule,
    CRUDTableModule,
    SharedComponentsModule,
    FormsModule,
    ReactiveFormsModule,
    InlineSVGModule,
  ],
  providers: [SponsorDetailResolver, ListSponsorsResolver],
})
export class SponsorManagementModule {}
