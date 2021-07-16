import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { ListSponsorsComponent } from './list-sponsors/list-sponsors.component';

const routes: Routes = [
  {
    path: "",
    component: ListSponsorsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorManagementRoutingModule {}
