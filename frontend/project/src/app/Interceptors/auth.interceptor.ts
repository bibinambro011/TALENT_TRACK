import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { CommonService } from '../Services/common.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  adminToken!: string;
  userToken!: string;
  agentToken!: string;

  constructor(private service: CommonService) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    this.adminToken = this.service.getAdminTokenFromLocalStorage();
    this.userToken = this.service.getUserTokenFromLocalStorage();
    this.agentToken = this.service.getAgentTokenFromLocalStorage();
    if (window.location.pathname.includes('/admin') && this.adminToken) {
      //Check admin auth
      console.log('Admin Interceptor works');
      const adminToken: string = this.adminToken;

      const authRequest = req.clone({
        setHeaders: {
          'Content-Type': 'application/json',
          Authorization: `Admin-Bearer ${adminToken}`,
        },
      });
      return next.handle(authRequest);
    } else if (window.location.pathname.includes('/user') && this.userToken) {
      // Checking mentee auth
      // user interceptor checking
    
      const userToken: string = this.userToken;
      console.log('User interceptor works',userToken);
      const authRequest = req.clone({
        setHeaders: {
          Authorization: `User-Bearer ${userToken}`,
        },
      });
      return next.handle(authRequest);
    } else if (window.location.pathname.includes('/agent') && this.agentToken) {
      // Checking mentor auth
      // agent interceptor checking
      console.log('agent interceptor works');
      const agentToken: string = this.agentToken;

      const authRequest = req.clone({
        setHeaders: {
          Authorization: `Agent-Bearer ${this.agentToken}`,
        },
      });
      return next.handle(authRequest);
    } else {
      console.log('Normal interceptor works');
      return next.handle(req);
    }
  }
}
