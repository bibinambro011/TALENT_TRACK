import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AgentService } from 'src/app/Services/agent.service';
import { SocketService } from 'src/app/Services/socket.service';
import { ToasterService } from 'src/app/Services/toaster.service';
import { getAgentInfo } from 'src/app/store/userStore/agentStore/agectSelector';
import { loginagent } from 'src/app/store/userStore/agentStore/agentAction';

@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css']
})
export class AgentLoginComponent {
  loginform!: FormGroup;
  userdata !:any
  success:boolean=true
  shouldHideChat:boolean=true
  @Output() loginSuccess: EventEmitter<boolean> = new EventEmitter();
  constructor(
    private formbuilder: FormBuilder,
    private service: AgentService,
     private store:Store,
     private toastr:ToasterService,
     private socketservice:SocketService
  
  ) {
    this.loginform = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  userlogin() {
    if (this.loginform.valid) {
      console.log("inside userlogin function")
      const email = this.loginform.get('email')?.value as  string
      const password = this.loginform.get('password')?.value as string
      let userCredentails={
        email:email,
        password:password
      }
      console.log("userCredentials==>",userCredentails)
this.loginform.reset()
   this.store.dispatch(loginagent({agentCredentails:userCredentails}))  
   

  
    }else{
      this.toastr.error("please provide the credentials")
    }
    
    
  }
  
}
