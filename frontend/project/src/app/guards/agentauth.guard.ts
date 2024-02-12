import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const agentauthGuard: CanActivateFn = (route, state) => {
  const agentAuth=inject(AuthService)
  const router=inject(Router)
  if(agentAuth.checkagentLoggedIn()){
    return true
  }else{
    router.navigate(["/agent/agent-login"])
    return false;
  }
 
};
