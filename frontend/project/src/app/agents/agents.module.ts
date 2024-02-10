import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AgentsRoutingModule } from './agents-routing.module';
import { AgentsComponent } from './agents/agents.component';
import { AgentRegisterComponent } from './agent-register/agent-register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgentLoginComponent } from './agent-login/agent-login.component';
import { AgentHomeComponent } from './agent-home/agent-home.component';
import { AgentNavbarComponent } from './agent-navbar/agent-navbar.component';
import { AgentotpComponent } from './agentotp/agentotp.component';
import { AgentReducer } from '../store/userStore/agentStore/agentReducer';
import { AgentEffect } from '../store/userStore/agentStore/agentEffects';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { HttpClientModule } from '@angular/common/http';
import { AgentSearchComponent } from './agent-search/agent-search.component';
import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';

@NgModule({
  declarations: [
    AgentsComponent,
    AgentRegisterComponent,
    AgentLoginComponent,
    AgentHomeComponent,
    AgentNavbarComponent,
    AgentotpComponent,
    AgentSearchComponent,
    AgentProfileComponent,
  ],
  imports: [
    CommonModule,
    AgentsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    SidebarModule,
    ButtonModule

  ],
})
export class AgentsModule {}
