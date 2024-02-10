import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ToasterService } from 'src/app/Services/toaster.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  profileForm !: FormGroup; 
  errorMessage !: string;

  constructor(private formBuilder: FormBuilder,private service:UserService,private toastr: ToastrService,private router:Router) {} 

  ngOnInit(): void {
   
    this.profileForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      category:["",Validators.required],
      image: ['',Validators.required],
      // certificates:[""]
    });
  }
  onSubmit() {
    console.log("before function")
  
    
      const firstName= this.profileForm.get('firstName')?.value;
      const lastName= this.profileForm.get('lastName')?.value;
      const email = this.profileForm.get('email')?.value;
      const password = this.profileForm.get('password')?.value;
      const category=this.profileForm.get("category")?.value
      const confirmPassword = this.profileForm.get('confirmPassword')?.value;
      const image=this.profileForm.get("image")?.value
      // const certificates=this.profileForm.get("certificates")?.value
      

      const obj={
        firstName:firstName,
        lastName:lastName,
        email:email,
        password:password,
        confirmPassword:confirmPassword,
        image:image,
        category:category,
        // certificate:certificates
      }
      if (this.profileForm.invalid) {
        // Validate each field and display corresponding error messages
        this.errorMessage = 'Please fill all required fields.';
        return;
      }
  
      if (this.profileForm.get('password')?.value !== this.profileForm.get('confirmPassword')?.value) {
        this.toastr.error('password do not match');
        return;
      }
     
      this.service.registerUser(obj).subscribe((result)=>{
        localStorage.setItem('email',obj.email); 
        localStorage.setItem('role','user'); 
        this.router.navigate(["/user/mailverify"])

      },(error)=>{
        this.toastr.error('email already exists');
        
      })
    } 
     hasError(controlName: string, errorName: string) {
      return this.profileForm.get(controlName)?.hasError(errorName);
    }
    }
    // showToaster() {
      
    //   this.toastr.show('Hello world!');
    //   this.toastr.success('Operation completed successfully!');
    //   this.toastr.error('An error occurred, please try again.');
    //   this.toastr.success('Saved!', 'Profile', {
    //     timeOut: 2000
    //   });
      
    //     }
      
    
     


