import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import { AgentService } from 'src/app/Services/agent.service';
import { ToasterService } from 'src/app/Services/toaster.service';
import { UserService } from 'src/app/Services/user.service';
import { WindowRefService } from 'src/app/Services/window-ref.service';
import { getUserInfo } from '../../store/userStore/userSelector'
import { Router } from '@angular/router';

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
 
  
  constructor(private agentservice:AgentService,private store:Store,private userservice:UserService,private toastr:ToasterService,private winRef: WindowRefService,private router:Router){}

  availableslots(id:string){
   
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
//walletPayment
walletpayment(paymetdetails:any){
  this.visible=false
    let userid=this.getUserId()
    const obj={
      slotId:paymetdetails._id,
      agentId:paymetdetails.agentId,
      userId:localStorage.getItem("userId"),
      time:paymetdetails.time,
      date:paymetdetails.date,
      bookingamount:paymetdetails.bookingAmount
    }
    this.bookingdata=obj
    this.userservice.walletpayment(obj).subscribe((res:any)=>{
      if(res instanceof Array){
        this.availableslots(res[0].agentId);
        this.toastr.success("your slot has been booked")
        this.paymentmsummaryvisible[this.selectedindex]=false
      }else{
        this.toastr.error("there is not enough wallet balance for this transaction")
      }
   
    
    })
}
  //slot book
  userslotbook(data:any){
    this.visible=false
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

      image: 'assets/images/tt.jpg', // company logo or product image

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
          this.paymentmsummaryvisible[this.selectedindex]=false
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

  startChat(agentId:string){
    this.router.navigate(["user/chat",agentId])
  }

  ngOnInit(){
 
   
  }
  paymentmsummaryvisible: boolean[] = [];
  visible: boolean = false;
  selectedindex!:number
  // paymentmsummaryvisible:boolean=false
 

    showDialog() {
        this.visible = true;
       
       
    }
    showpaymentSummary(index:number){
      this.selectedindex=index
      console.log("items is==>",index)
      this.paymentmsummaryvisible[index] = true;
      for (let i = 0; i < this.slots.length; i++) {
        if (i !== index) {
            this.paymentmsummaryvisible[i] = false;
        }
    }
     
    
      
    }
}
