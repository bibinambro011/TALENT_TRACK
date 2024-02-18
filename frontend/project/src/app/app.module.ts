import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './Components/register/register.component';
import { LoginComponent } from './Components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { UserReducer } from './store/userStore/userReducer';
import { UserEffect } from './store/userStore/userEffects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { UserhomeComponent } from './Components/userhome/userhome.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ToastNoAnimationModule, ToastrModule } from 'ngx-toastr';
import { OtpenterComponent } from './Components/otpenter/otpenter.component';
import { ErrorInterceptor } from './Interceptors/error.interceptor';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { AgentsModule } from './agents/agents.module';
import { AgentReducer } from './store/userStore/agentStore/agentReducer';
import { AgentEffect } from './store/userStore/agentStore/agentEffects';
import { FooterComponent } from './Components/footer/footer.component';
import { AuthInterceptor } from './Interceptors/auth.interceptor';
import { ProfileComponent } from './Components/profile/profile.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { AdminModule } from './admin/admin.module';
import { SearchAgentComponent } from './Components/search-agent/search-agent.component';
import { SharedModule } from 'primeng/api';
import { AgentDetailsComponent } from './shared/agent-details/agent-details.component';
import { CalendarModule } from 'primeng/calendar';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    UserhomeComponent,
    OtpenterComponent,
    NavbarComponent,
    FooterComponent,
    ProfileComponent,
    SearchAgentComponent,
    AgentDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CalendarModule,
    SidebarModule,
    ButtonModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    SharedModule,
    ToastNoAnimationModule.forRoot(),
    ToastrModule.forRoot({
      timeOut: 3000, // Time to close the toaster (in milliseconds)
      positionClass: 'toast-top-right', // Toast position
      closeButton: true, // Show close button
      progressBar: true, // Show progress bar
    }),

    StoreModule.forRoot({ user: UserReducer,agent: AgentReducer }, {}),
    EffectsModule.forRoot([UserEffect,AgentEffect]),
    AgentsModule,
    AdminModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
  
})
export class AppModule {}
