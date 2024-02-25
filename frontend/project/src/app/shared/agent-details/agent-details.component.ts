import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AgentService } from 'src/app/Services/agent.service';
import { ToasterService } from 'src/app/Services/toaster.service';
import { UserService } from 'src/app/Services/user.service';
import { WindowRefService } from 'src/app/Services/window-ref.service';
import { getUserInfo } from 'src/app/store/userStore/userSelector';

@Component({
  selector: 'app-agent-details',
  templateUrl: './agent-details.component.html',
  styleUrls: ['./agent-details.component.css']
})
export class AgentDetailsComponent {
  @Input() searchagentdata:any
  allotedTime:any=[]
  hideSidebar:boolean=false
  slots:any[]=[]
  date:Date=new Date()
  minDate:Date=new Date();
  bookingdata:any;
 
  
  constructor(private agentservice:AgentService,private store:Store,private userservice:UserService,private toastr:ToasterService,private winRef: WindowRefService){}

  availableslots(id:any){
   
    this.slots=[]
   this.agentservice.availableslots(id).subscribe((res)=>{
    
    if(res){
      res.forEach((data:any)=>{
       
        this.slots.push(data)
      })
    }
   })
  }
  
getUserId(){
  let userId
  this.store.select(getUserInfo).subscribe((res)=>{
    userId=res._id
   })
   return userId
}
  //slot book
  userslotbook(data:any){
    let userid=this.getUserId()
    const obj={
      slotId:data._id,
      agentId:data.agentId,
      userId:userid,
      time:data.time,
      date:data.date,
      bookingamount:data.bookingAmount
    }
    this.bookingdata=obj
    // this.userservice.getKey().subscribe((data:string)=>{
    //   if(data){
       
    //   }
    // })
    this.userservice.userbookingslot(obj).subscribe((data)=>{
      if(data){
        this.payWithRazor(data);
        this.toastr.success('slot booked successfully')
      }else{
        this.toastr.error('failure book slot')
      }
    })
  }




  //



  payWithRazor(val:any) {

    const options: any = {

      key: 'rzp_test_9CEMr0p0borLvv',

      amount: Number(val.amount), // amount should be in paise format to display Rs 1255 without decimal point

      currency: 'INR',

      name: 'Talent Track', // company name or product name

      description: '',  // product description

      image: './assets/logo.png', // company logo or product image

      order_id: val.id, // order_id created by you in backend

      modal: {

        // We should prevent closing of the form when esc key is pressed.

        escape: false,

      },

      notes: {

        // include notes if any

      },

      theme: {

        color: '#0c238a'

      }

    };

    options.handler = ((response:any, error:any) => {

      options.response = response;
          // call your backend api to verify payment signature & capture transaction
      this.userservice.paymentVerification(response).subscribe((data)=>{
        if (data.success){
          this.slots=[]
          data.payment.forEach((res:any)=>{
            this.slots.push(res)
          })
          this.toastr.success("your slot has been confirmed")
        }else{
          this.slots=[]
          data.payment.forEach((res:any)=>{
            this.slots.push(res)
          })
          this.toastr.error("please try again")
        }
      })
      

    });

    options.modal.ondismiss = (() => {

      // handle the case when user closes the form while transaction is in progress

      console.log('Transaction cancelled.');

    });

    const rzp = new this.winRef.nativeWindow.Razorpay(options);

    rzp.open();

  }

  ngOnInit(){
   
  }
}
