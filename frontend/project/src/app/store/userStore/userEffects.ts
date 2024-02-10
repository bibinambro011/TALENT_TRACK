import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"
import { UserService } from "src/app/Services/user.service"
import { loginuser, userloginsuccess } from "./userAction"
import { catchError, exhaustMap, map, of } from "rxjs"
import { Router } from "@angular/router"
import { ToasterService } from "src/app/Services/toaster.service"

@Injectable()
export class UserEffect {
 constructor(private action$:Actions,
    private service:UserService,
    private route:Router,
    private toastr:ToasterService){

 }
 _loginuser=createEffect(()=>
 this.action$.pipe(
    ofType(loginuser),
    exhaustMap((action)=>{
        console.log(action.userCredentails)
        return this.service.userlogin(action.userCredentails).pipe(
            
            map((data)=>{
                console.log(data)
                if(data.usertoken){
                    localStorage.setItem('token',JSON.parse(JSON.stringify(data)).usertoken)
                    this.route.navigate(['/user/home'])
                    this.toastr.success("login success !!")
                   
                    return userloginsuccess({userdetails:data})
                }else{
                  return  this.toastr.error("invalid credentials")
                }
               
            }),
            catchError((error)=>{
                console.log('here')
                return of(error.message)
            })
        )
    })
 )
 )
}
