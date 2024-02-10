import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminShowalluserComponent } from './admin-showalluser/admin-showalluser.component';
import { AdminShowallagentsComponent } from './admin-showallagents/admin-showallagents.component';

const routes: Routes = [
  {path:'admin',children:[
    {path:'',component:AdminLoginComponent},
  {path:"admin-home",component:AdminHomeComponent},
  {path:"admin-dashboard",component:AdminDashboardComponent},
  {path:"admin-allusers",component:AdminShowalluserComponent},
  {path:"admin-allagents",component:AdminShowallagentsComponent},
  
  ]}
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
