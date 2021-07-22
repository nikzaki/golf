import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  ListSponsorsComponent,
  AddEditSponsorComponent,
} from "./_components/sponsors-components-index";

const routes: Routes = [
  {
    path: "",
    component: ListSponsorsComponent,
  },
  {
    path: "add",
    component: AddEditSponsorComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorManagementRoutingModule {}
