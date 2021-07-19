import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorManagementRoutingModule } from './sponsor-management-routing.module';
import { MetrialModule } from '../metrial/metrial.module';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';
import { ListSponsorsComponent } from './list-sponsors/list-sponsors.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ListSponsorsComponent],
  imports: [
    CommonModule,
    SponsorManagementRoutingModule,
    MetrialModule,
    CRUDTableModule,
    FormsModule
  ]
})
export class SponsorManagementModule { }
