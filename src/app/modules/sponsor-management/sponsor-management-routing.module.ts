import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  ListSponsorsComponent,
  AddEditSponsorComponent,
} from "./_components/sponsors-components-index";
import { SponsorResolver } from "./resolver/sponsor.resolver";

const routes: Routes = [
  {
    path: "",
    component: ListSponsorsComponent,
  },
  {
    path: "add",
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
export class SponsorManagementRoutingModule {}
