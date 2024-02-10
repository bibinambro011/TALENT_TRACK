import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/Services/admin.service';

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
    
  },(error)=>{

  })
     
    }
    
    
  }
}
