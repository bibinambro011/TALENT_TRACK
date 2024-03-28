import { Injectable, Injector } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../Services/user.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private toastr: ToastrService,
    private router: Router,
    private injector: Injector
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
      
          // Using refresh token
          return this.handleRefreshToken(request, next);
        }
        let errorMessage = 'An error occurred';
        if (error.error instanceof ErrorEvent) {
          // Client-side error
          errorMessage = `Error: ${error.error.message}`;
        } else {
          // Server-side error
          errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.toastr.error(errorMessage); // Show error notification to the user
        return throwError(errorMessage);
      })
    );
  }

  handleRefreshToken(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const userService = this.injector.get(UserService);
    return userService.generateRefreshToken().pipe(
      switchMap((data: any) => {
        userService.saveTokenData(data);
        const newRequest = this.addTokenHeader(request, data.refreshToken);
        // Forward the modified request to the next handler
        return next.handle(newRequest);
      }),
      catchError((error: any) => {
        this.router.navigate(["user/login"]);
        return throwError(error);
      })
    );
  }

  addTokenHeader(req: HttpRequest<any>, token: string): HttpRequest<any> {
    return req.clone({
      setHeaders: {
        Authorization: `User-Bearer ${token}`,
      },
    });
  }
}
