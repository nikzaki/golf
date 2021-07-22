import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEditSponsorComponent } from "./add-edit-sponsor/add-edit-sponsor.component";
import { ListSponsorsComponent } from './list-sponsors/list-sponsors.component';

const routes: Routes = [
  {
    path: "",
    component: ListSponsorsComponent,
  },
  {
    path: 'add',
    component: AddEditSponsorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorManagementRoutingModule { }
