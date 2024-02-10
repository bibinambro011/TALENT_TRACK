import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/app/Services/user.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-otpenter',
  templateUrl: './otpenter.component.html',
  styleUrls: ['./otpenter.component.css'],
})
export class OtpenterComponent {
  constructor(private service: UserService, private toaster: ToastrService,private router:Router) {}
  userotp !:number
  onSubmit(userForm: NgForm) {
    const email = localStorage.getItem('email');
    const obj = {
      email: email,
      otp: this.userotp,
    };
    console.log('Form submitted:', obj);
    this.service.verifyUser(obj).subscribe(
      (result) => {
        this.toaster.success('verification successfull !!');
        this.router.navigate(["/user/login"])
      },
      (error) => {
        // Handle error
        this.toaster.error('entered otp doesnt match plaese try again !!');
      }
    );
  }
}
