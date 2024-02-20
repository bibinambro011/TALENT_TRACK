import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  profileForm!: FormGroup;
  errorMessage: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private service: UserService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm(): void {
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      category: ['', Validators.required],
      image: [null, Validators.required], // Change to null for file type
    });
  }

  onSubmit(): void {
    if (this.profileForm.invalid) {
      this.errorMessage = 'Please fill in all required fields.';
      return;
    }

    const formData = new FormData();
    formData.append('firstName', this.profileForm.get('firstName')?.value.toLowerCase());
    formData.append('lastName', this.profileForm.get('lastName')?.value.toLowerCase);
    formData.append('email', this.profileForm.get('email')?.value);
    formData.append('password', this.profileForm.get('password')?.value);
    formData.append('confirmPassword', this.profileForm.get('confirmPassword')?.value);
    formData.append('category', this.profileForm.get('category')?.value);
    formData.append('image', this.profileForm.get('image')?.value);

    if (this.profileForm.get('password')?.value !== this.profileForm.get('confirmPassword')?.value) {
      this.toastr.error('Passwords do not match');
      return;
    }
    this.service.registerUser(formData).subscribe(
      () => {
        localStorage.setItem('email', formData.get('email') as string);
        localStorage.setItem('role', 'user');
        this.router.navigate(['/user/mailverify']);
      },
      (error) => {
        this.toastr.error('An error occurred while registering');
        console.error('Registration failed', error);
      }
    );
  }

  onFileSelected(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.profileForm.get('image')?.setValue(file);
    }
  }

  hasError(controlName: string, errorName: string): boolean {
    return this.profileForm.get(controlName)?.hasError(errorName) ?? false;
  }
}
