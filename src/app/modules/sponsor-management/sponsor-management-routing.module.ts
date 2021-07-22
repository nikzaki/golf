import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AddEditSponsorComponent } from "./add-edit-sponsor/add-edit-sponsor.component";
import { ListSponsorsComponent } from './list-sponsors/list-sponsors.component';
import { SponsorResolver } from "./resolver/sponsor.resolver";

const routes: Routes = [
  {
    path: "",
    component: ListSponsorsComponent,
  },
  {
    path: 'add',
    component: AddEditSponsorComponent,
  },
  {
    path: "edit/:id",
    component: AddEditSponsorComponent,
    resolve: {
      sponsor: SponsorResolver
    }
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorManagementRoutingModule { }
