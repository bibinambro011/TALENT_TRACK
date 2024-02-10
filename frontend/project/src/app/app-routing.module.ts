import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserhomeComponent } from './Components/userhome/userhome.component';
import { LoginComponent } from './Components/login/login.component';
import { RegisterComponent } from './Components/register/register.component';
import { OtpenterComponent } from './Components/otpenter/otpenter.component';
import { AgentsComponent } from './agents/agents/agents.component';
import { AgentRegisterComponent } from './agents/agent-register/agent-register.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { userauthGuard } from './guards/userauth.guard';

const routes: Routes = [
  {path:"",component:UserhomeComponent},
  {path:"user",children:[ {path:"",component:UserhomeComponent},
  {path:"profile",component:ProfileComponent,canActivate:[userauthGuard]},
  {path:"home",component:UserhomeComponent},
  {path:"login",component:LoginComponent},
  {path:"register",component:RegisterComponent},
  {path:"mailverify",component:OtpenterComponent},]},
 
  // {path:"agents",children:[
  //   {path:"register",component:AgentRegisterComponent}
  // ]}
  {
    path: 'agents',
    loadChildren: () => import('./agents/agents.module').then(m => m.AgentsModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
