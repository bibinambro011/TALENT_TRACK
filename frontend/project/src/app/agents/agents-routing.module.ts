import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AgentHomeComponent } from './agent-home/agent-home.component';
import { AgentLoginComponent } from './agent-login/agent-login.component';
import { AgentotpComponent } from './agentotp/agentotp.component';
import { AgentRegisterComponent } from './agent-register/agent-register.component';
import { AgentSearchComponent } from './agent-search/agent-search.component';
import { userauthGuard } from '../guards/userauth.guard';
import { AgentProfileComponent } from './agent-profile/agent-profile.component';
import { agentauthGuard } from '../guards/agentauth.guard';

import { AgentProfilePageComponent } from './agent-profile-page/agent-profile-page.component';
import { AgentAppointmentsComponent } from './agent-appointments/agent-appointments.component';
import { ChatComponent } from './chat/chat.component';
import { DefaultsloatComponent } from './defaultsloat/defaultsloat.component';

const routes: Routes = [
  {
    path: 'agent',
    children: [
      { path: '', component: AgentRegisterComponent },
      { path: 'agentregister', component: AgentRegisterComponent },
      {
        path: 'agent-home',
        component: AgentHomeComponent,
        canActivate: [agentauthGuard],
      },
      { path: 'agent-login', component: AgentLoginComponent },
      { path: 'agentmailverify', component: AgentotpComponent },
      {
        path: 'agent-search',
        component: AgentSearchComponent,
        canActivate: [userauthGuard],
      },
      {
        path: 'agent-profile',
        component: AgentProfileComponent,
        canActivate: [agentauthGuard],
      },

      { path: 'agent-appointments', component: AgentAppointmentsComponent },
      { path: 'agent-defaultslotadd', component: DefaultsloatComponent },
      {
        path: 'agent-profile-page',
        component: AgentProfilePageComponent,
        canActivate: [agentauthGuard],
      },
      {path:'agent-chat',component:ChatComponent}
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AgentsRoutingModule {}
