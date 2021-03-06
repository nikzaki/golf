import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './_layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('./dashboard/dashboard.module').then((m) => m.DashboardModule),
      },
      {
        path: 'user-management',
        loadChildren: () =>
          import('../modules/user-management/user-management.module').then(
            (m) => m.UserManagementModule
          ),
      },
      {
        path: 'user-profile',
        loadChildren: () =>
          import('../modules/user-profile/user-profile.module').then(
            (m) => m.UserProfileModule
          ),
      },
      {
        path: 'club',
        loadChildren: () =>
          import('../modules/clubs/clubs.module').then(
            (m) => m.ClubsModule
          ),
      },
      {
        path: 'sponsor-management',
        loadChildren: () =>
          import('../modules/sponsor-management/sponsor-management.module').then(
            (m) => m.SponsorManagementModule
          ),
      },
      {
        path: 'courses',
        loadChildren: () =>
          import('../modules/sponsor-management/sponsor-management.module').then(
            (m) => m.SponsorManagementModule
          ),
      },
      {
        path: 'tournament',
        loadChildren: () =>
          import('../modules/sponsor-management/sponsor-management.module').then(
            (m) => m.SponsorManagementModule
          ),
      },
      {
        path: 'bookings',
        loadChildren: () =>
          import('../modules/sponsor-management/sponsor-management.module').then(
            (m) => m.SponsorManagementModule
          ),
      },
      {
        path: 'finance',
        loadChildren: () =>
          import('../modules/sponsor-management/sponsor-management.module').then(
            (m) => m.SponsorManagementModule
          ),
      },
      {
        path: 'handicaps',
        loadChildren: () =>
          import('../modules/sponsor-management/sponsor-management.module').then(
            (m) => m.SponsorManagementModule
          ),
      },
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      {
        path: '**',
        redirectTo: 'error/404',
      },
      {
        path: 'builder',
        loadChildren: () =>
          import('./builder/builder.module').then((m) => m.BuilderModule),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
