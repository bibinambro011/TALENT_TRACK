import { Injectable } from "@angular/core"
import { Actions, createEffect, ofType } from "@ngrx/effects"

import { loginagent, agentloginsuccess } from "./agentAction"
import { catchError, exhaustMap, map, of } from "rxjs"
import { Router } from "@angular/router"
import { ToasterService } from "src/app/Services/toaster.service"
import { AgentService } from "src/app/Services/agent.service"

@Injectable()
export class AgentEffect {
 constructor(private action$:Actions,
    private service:AgentService,
    private route:Router,
    private toastr:ToasterService){
console.log("contructor function get called")
 }
 _loginuser=createEffect(()=>
 this.action$.pipe(
    ofType(loginagent),
    exhaustMap((action)=>{
        console.log("agent credentials are==>",action.agentCredentails)
        return this.service.agentlogin(action.agentCredentails).pipe(
            
            map((data)=>{
                console.log(data)
                if(data.agenttoken){
                    localStorage.setItem('agenttoken',JSON.parse(JSON.stringify(data)).agenttoken)
                    if(data.userdetails.verified){
                        this.route.navigate(['/agent/agent-home'])
                        this.toastr.success("login success !!")
                    }else{
                        this.toastr.error("you have been registered please wait untill admin verify you !!")
                    }
                   
                   
                    return agentloginsuccess({agentdetails:data})
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
