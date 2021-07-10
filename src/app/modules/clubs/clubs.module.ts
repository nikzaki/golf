import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClubsRoutingModule } from './clubs-routing.module';
import { ClubsComponent } from './clubs.component';


@NgModule({
  declarations: [ClubsComponent],
  imports: [
    CommonModule,
    ClubsRoutingModule
  ]
})
export class ClubsModule { }
