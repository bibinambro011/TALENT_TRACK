import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../Services/auth.service';
import { inject } from '@angular/core';

export const userauthGuard: CanActivateFn = (route, state) => {
  const userAuth=inject(AuthService)
  const router=inject(Router)
  if(userAuth.checkUserloggedIn()){
    return true
  }else{
    router.navigate(["/user/login"])
    return false;
  }
 
};
