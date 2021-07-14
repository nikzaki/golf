import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { SponsorManagementComponent } from "./sponsor-management.component";

const routes: Routes = [
  {
    path: "",
    component: SponsorManagementComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SponsorManagementRoutingModule {}
