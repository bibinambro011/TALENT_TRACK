import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/Services/admin.service';
import { ToasterService } from 'src/app/Services/toaster.service';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginform!: FormGroup;
  userdata !:any
  constructor(
    private formbuilder: FormBuilder,
    private service: AdminService,
    private toastr:ToasterService,
    private router:Router
   
  
  ) {
    this.loginform = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  adminlogin() {
    if (this.loginform.valid) {
      const email = this.loginform.get('email')?.value as  string
      const password = this.loginform.get('password')?.value as string
      let userCredentails={
        email:email,
        password:password
      }
this.loginform.reset()
  this.service.adminlogin(userCredentails).subscribe((result)=>{
    if(result){
      this.toastr.success("login success")
      this.router.navigate(["/admin/admin-home"])

    }else{
      this.toastr.error("error login")
    }
  },(error)=>{

  })
     
    }
    
    
  }
}
