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
                console.log("result is==>",data)
                if(data as unknown as string=='password mismatch'){
                    return this.toastr.error("password mismatch")
                }
                if(data.usertoken){
                    localStorage.setItem('token',JSON.parse(JSON.stringify(data)).usertoken)
                    localStorage.setItem('refreshtoken',JSON.parse(JSON.stringify(data)).refreshtoken)
                    this.route.navigate(['/user/home'])
                    this.toastr.success("login success !!")
                   
                    return userloginsuccess({userdetails:data})
                }else{
                  return  this.toastr.error("you are blocked by admin")
                }
               
            }),
            catchError((error)=>{
                return of(error.message)
            })
        )
    })
 )
 )
}
