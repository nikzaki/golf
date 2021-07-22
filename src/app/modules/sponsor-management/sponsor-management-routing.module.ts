import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import {
  ListSponsorsComponent,
  AddEditSponsorComponent,
} from "./_components/sponsors-components-index";
import {
  ListSponsorsResolver,
  SponsorDetailResolver,
} from "./_resolvers/sponsor-resolvers-index";

const routes: Routes = [
  {
    path: "",
    component: ListSponsorsComponent,
    resolve: {
      sponsorListData: ListSponsorsResolver,
    },
  },
  {
    path: "add",
    component: AddEditSponsorComponent,
  },
  {
    path: "edit/:id",
    component: AddEditSponsorComponent,
    resolve: {
      sponsorDetail: SponsorDetailResolver,
    },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorManagementRoutingModule {}
