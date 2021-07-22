import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorManagementRoutingModule } from './sponsor-management-routing.module';
import { MetrialModule } from '../metrial/metrial.module';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { ListSponsorsComponent } from './list-sponsors/list-sponsors.component';
import { AddEditSponsorComponent } from './add-edit-sponsor/add-edit-sponsor.component';
import { SharedComponentsModule } from 'src/app/_shared_components/_shared-components.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InlineSVGModule } from 'ng-inline-svg';
import { SponsorResolver } from './resolver/sponsor.resolver';


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
    InlineSVGModule
  ],
  providers: [
    SponsorResolver
  ],
})
export class SponsorManagementModule { }
