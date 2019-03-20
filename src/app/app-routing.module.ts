import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { WomenComponent } from './women/women.component';
import { WomanDetailComponent }  from './woman-detail/woman-detail.component';
import { DashboardComponent }  from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'detail/:id', component: WomanDetailComponent },
  { path: 'women', component: WomenComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }


