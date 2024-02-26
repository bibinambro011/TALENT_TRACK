import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { UserService } from 'src/app/Services/user.service';
import { loginuser } from 'src/app/store/userStore/userAction';
import { getUserInfo } from 'src/app/store/userStore/userSelector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginform!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private service: UserService,
    private store: Store
  ) {
    this.loginform = this.formbuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }
  userlogin() {
    if (this.loginform.valid) {
      const email = this.loginform.get('email')?.value as string;
      const password = this.loginform.get('password')?.value as string;
      let userCredentails = {
        email: email,
        password: password,
      };
      this.loginform.reset();
      this.store.dispatch(loginuser({ userCredentails }));
      this.store.select(getUserInfo).subscribe((res) => {
        console.log('this is a response from selector', res);
      });
    }
  }
}
