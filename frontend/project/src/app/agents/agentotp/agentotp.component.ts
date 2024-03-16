import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgentService } from 'src/app/Services/agent.service';

@Component({
  selector: 'app-agentotp',
  templateUrl: './agentotp.component.html',
  styleUrls: ['./agentotp.component.css']
})
export class AgentotpComponent {
  constructor(private service: AgentService, private toaster: ToastrService,private router:Router) {}
  userotp !:number
  onSubmit(userForm: NgForm) {
    const email = localStorage.getItem('agentemail');
    const obj = {
      email: email as string,
      otp: this.userotp ,
    };
    console.log('Form submitted:', obj);
    this.service.verifyUser(obj).subscribe(
      (result) => {
        console.log("verified user details==>", result)
        this.toaster.success('verification successfull !!');
        this.router.navigate(["/agent/agent-login"])
      },
      (error) => {
        // Handle error
        this.toaster.error('entered otp doesnt match plaese try again !!');
      }
    );
  }
}