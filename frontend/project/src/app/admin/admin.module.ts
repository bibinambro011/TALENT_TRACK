import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin/admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AdminComponent,
    AdminLoginComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,ReactiveFormsModule,FormsModule,HttpClientModule
  ]
})
export class AdminModule { }
