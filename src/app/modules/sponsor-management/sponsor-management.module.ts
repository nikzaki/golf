import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SponsorManagementRoutingModule } from './sponsor-management-routing.module';
import { SponsorManagementComponent } from './sponsor-management.component';
import { MetrialModule } from '../metrial/metrial.module';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';


@NgModule({
  declarations: [SponsorManagementComponent],
  imports: [
    CommonModule,
    SponsorManagementRoutingModule,
    MetrialModule,
    CRUDTableModule
  ]
})
export class SponsorManagementModule { }
