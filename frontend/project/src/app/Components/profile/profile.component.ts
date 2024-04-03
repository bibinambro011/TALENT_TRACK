import { Component, OnInit, Output, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/Services/common.service';
import { EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { getUserInfo } from 'src/app/store/userStore/userSelector';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import * as XLSX from "xlsx"
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit, OnDestroy {
  sidebarVisible: boolean = true;
  showdashboard: boolean = false;
  footervisible:boolean=false
  showprofile: boolean = false;
  showappointments: boolean = false;
  id: any;
  selectedOption: any;
  user: any[] = [];
  userbookings: any[] = [];
  editedUser: any;
  editMode: boolean = false;
  uploadForm!: FormGroup;
  filedvalue: string = 'bibin';
  
  recordCount!:number
  totalrecords:any
  totalusers!:string

  transactionCount!:number;
  totaltransactions:any;
  bookingstatus:string="All"
  date: Date | undefined = new Date();
  
  mindate = new Date();

  endDate:Date |undefined=new Date()



  transactions:any=[]
  eventdata: EventEmitter<string> = new EventEmitter<string>();
  logoutSubscription: Subscription = new Subscription();
  userInfoSubscription: Subscription = new Subscription();
  userBookingsSubscription: Subscription = new Subscription();

  constructor(
    private service: CommonService,
    private router: Router,
    private store: Store,
    private userservice: UserService,
    private formBuilder: FormBuilder
  ) {}

  logout() {
    this.eventdata.emit('data send from profile component');
    localStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }
  async filterdates(){
    console.log('filterdates==>', this.date, this.endDate,this.id, this.bookingstatus)
    let dateobj={
      startdate:this.date,
      endDate:this.endDate,
      status:this.bookingstatus,
      id:this.id
    }
    console.log("dateobj is==>", dateobj)
   await this.userservice.appontmentfilterbydate(this.date,this.endDate,this.bookingstatus,this.id).toPromise().then((res:any)=>{
    this.userbookings = [...res]

  })
  this.totalrecords = this.userbookings
 this.recordCount=this.totalrecords.length
  this.defaultPaginate()

  
    // this.userbookings = [...data];
  }

 async dashboard() {
    this.transactions=[]
    this.visibilityhandle();
    this.showdashboard = true;
  await  this.userservice.userTransactionHistory(this.id)
    .toPromise()
    .then((data) => {
      this.transactions = data;
    })
    .catch((error) => {
      // Handle error if needed
      console.error("Error occurred:", error);
    });
    this.totaltransactions=[...this.transactions]
    this.transactionCount=this.totaltransactions.length
  this.defaulttransactionPaginate()

  }
// transaction paginate 
transactionpaginate(event:any){
    this.transactions=[]
    let currenpage=event.page 
    let count=event.first 
    let currentPageData:any= this.totaltransactions.slice(count, (currenpage + 1) * 5);
    currentPageData.forEach((data:any)=>{
      this.transactions.push(data)
    })
}
defaulttransactionPaginate(){
  this.transactions=[]
  let currenpage=1
  let count=0
  let currentPageData:any= this.totaltransactions.slice(0,5);
   currentPageData.forEach((data:any)=>{
    this.transactions.push(data)
  })
}

 async Appointments() {
    this.visibilityhandle();
    this.showappointments = true;
    this.visibilityhandle();
    this.showappointments = true;
    this.userbookings = [];
    await this.userservice
      .userbookings('All', this.id)
      .toPromise().then((res:any)=>{
        this.userbookings = [...res]
      })
      this.totalrecords = this.userbookings.flat()
       this.recordCount = this.totalrecords.length;
     
    this.defaultPaginate()
  }

  profile() {
    this.visibilityhandle();
    this.showprofile = true;
  }

  cancelEdit() {
    this.editMode = false;
  }

  editprofile() {
    
    this.visibilityhandle;
    this.editMode = true;
    this.showprofile = true;
  }

  // creating a common function hor conditionally displaying the nnecessary fileds

  visibilityhandle() {
    this.editMode = false;
    this.showprofile = false;
    this.showdashboard = false;
    this.sidebarVisible = false;
    this.showprofile = false;
    this.showappointments = false;
    this.footervisible=true
  }
 async bookings(data: string) {
    this.visibilityhandle();
    this.showappointments = true;
    this.userbookings = [];
 await  this.userservice
      .userbookings(data, this.id)
      .toPromise().then((res:any)=>{
        this.userbookings = [...res]

      })
      this.totalrecords = this.userbookings
     this.recordCount=this.totalrecords.length
      this.defaultPaginate()
  }

  // booking cancellation from the user side

  async cancelbooking(data: string, userId: string, status: string, paymentId: string, slotId: string) {
    let details = {
      id: data,
      userid: userId,
      status: status,
      paymentId: paymentId,
      slotId: slotId
    };
  
    // Show the custom alert
    try {
      const result = await this.showCustomAlert(); // Assuming showCustomAlert returns a promise
  
      if (result.isConfirmed) {
        this.userbookings = [];
        const result:any = await this.userservice.cancelbooking(details).toPromise();
        this.userbookings = [...result];
      }
    } catch (error) {
      console.error('Error occurred:', error);
    }
    this.totalrecords=this.userbookings
    this.defaultPaginate()
  }
  
  
  showCustomAlert(): Promise<any> {
    return Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, cancel the booking',
    });
  }

  initForm(): void {
    this.uploadForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      image: [null, Validators.required], // Change to null for file type
    });
  }

  
// called this functiin when the form is get submitted

  onSubmit() {
    if (this.uploadForm.invalid) {
      return;
    }
    this.user = [];
    const formData = new FormData();
    formData.append('userId', this.id);
    formData.append('image', this.uploadForm.get('image')?.value);
    formData.append(
      'firstName',
      this.uploadForm.get('firstName')?.value.toLowerCase()
    );
    formData.append(
      'lastName',
      this.uploadForm.get('lastName')?.value.toLowerCase()
    );
    this.userservice.editUser(formData).subscribe((result) => {
      if (result) {
        result.forEach((data: any) => {
          this.user.push(data);
        });
      }
    });
    this.editMode = false;
  }
// getting the image
  onFileSelect(event: any): void {
    if (event.target.files.length > 0) {
      const file = event.target.files[0];
      this.uploadForm.get('image')?.setValue(file);
    }
  }
  ngOnInit() {
    this.initForm();
   
    this.id=localStorage.getItem('userId');
      // getting userdetails by passing user id, which is saved globally

    this.userservice.getUser(this.id).subscribe((res) => {
      if (res) {
        res.forEach((data: any) => {
          this.user.push(data);
        });
      }
    });
    
  }

// unsubscribing all the observables while leaving the component 

  ngOnDestroy(): void {
    this.logoutSubscription.unsubscribe();
    this.userInfoSubscription.unsubscribe();
    this.userBookingsSubscription.unsubscribe();
  }
  paginate(event:any) {
    this.userbookings=[]
    let currenpage=event.page 
    let count=event.first 
    let currentPageData:any= this.totalrecords.slice(count, (currenpage + 1) * 5);
     currentPageData.forEach((data:any)=>{
      this.userbookings.push(data)
    })
   
   
}
defaultPaginate(){
  this.userbookings=[]
    let currenpage=1;
    let count=5
    let currentPageData:any= this.totalrecords.slice(0,5);
     currentPageData.forEach((data:any)=>{
      this.userbookings.push(data)
    })
   
}
filename:string="excelsheet.xlsx"
downloadexcel(){
  console.log("excel file clicked")
let data=document.getElementById("table-data")
const ws:XLSX.WorkSheet=XLSX.utils.table_to_sheet(data)
const wb:XLSX.WorkBook=XLSX.utils.book_new()
XLSX.utils.book_append_sheet(wb,ws,"shhet1")
XLSX.writeFile(wb,this.filename)
}
public openPDF(): void {
  let DATA: any = document.getElementById('table-data');
  html2canvas(DATA).then((canvas:any) => {
    let fileWidth = 208;
    let fileHeight = (canvas.height * fileWidth) / canvas.width;
    const FILEURI = canvas.toDataURL('image/png');
    let PDF = new jsPDF('p', 'mm', 'a4');
    let position = 0;
    PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
    PDF.save('angular-demo.pdf');
  });
}
}