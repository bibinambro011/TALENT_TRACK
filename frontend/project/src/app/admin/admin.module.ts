import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PaginatorModule } from 'primeng/paginator';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { AdminShowalluserComponent } from './admin-showalluser/admin-showalluser.component';
import { AdminShowallagentsComponent } from './admin-showallagents/admin-showallagents.component';
import { AdminAppointmentsComponent } from './admin-appointments/admin-appointments.component';



@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent,
    AdminHomeComponent,
    AdminDashboardComponent,
    AdminShowalluserComponent,
    AdminShowallagentsComponent,
    AdminAppointmentsComponent
  ],
  imports: [
    CommonModule,PaginatorModule,
    AdminRoutingModule,ReactiveFormsModule,FormsModule,HttpClientModule,SidebarModule,ButtonModule,
  ]
})
export class AdminModule { }
