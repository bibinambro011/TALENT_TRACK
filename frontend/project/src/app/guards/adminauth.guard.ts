import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const adminauthGuard: CanActivateFn = (route, state) => {
  const adminAuth=inject(AuthService)
  const router=inject(Router)
  if(adminAuth.checkadminLoggedIn()){
    return true
  }else{
    router.navigate(["/admin/admin-login"])
    return false;
  }
 
};
