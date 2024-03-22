import { ChangeDetectorRef, Component, Input } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import { __await } from 'tslib';

@Component({
  selector: 'app-revenue-management',
  templateUrl: './revenue-management.component.html',
  styleUrls: ['./revenue-management.component.css']
})
export class RevenueManagementComponent {
  data: any;

  options: any;
  allusers:any
  allagents:any
  allappointments:any
  usercount:number=90
  agentcount!:number
  appointmentcount!:number
 
  


  
  constructor(private  service:AdminService) {}
 
  ngOnInit() {
    Promise.all([
      this.getAllusers(),
      this.getAllagents(),
      this.totalappointments()
    ]).then(() => {
      this.callChart();  
      this.piechart()
    });
  }
async getAllusers(){
 await this.service.getAllUsers().toPromise().then((res)=>{
    this.allusers=[...res]
   
    
  })
  this.usercount=this.allusers.length
}
async getAllagents(){
 await this.service.getAllAgents().toPromise().then((res)=>{
    this.allagents=[...res]
  
  })
  this.agentcount=this.allagents.length
}
async totalappointments(){
 await this.service.adminslots().toPromise().then((res)=>{
    this.allappointments=[...res]
    console.log("all appointments are", this.allappointments)
   
  })
  this.appointmentcount=this.allappointments.length
}
callChart(){
  const documentStyle = getComputedStyle(document.documentElement);
  const textColor = documentStyle.getPropertyValue('--text-color');
console.log("before")
  this.data = {
      labels: ['total users', 'total agents', 'confirmed appointments'],
      datasets: [
          {
              data: [this.usercount, this.agentcount, this.appointmentcount],
              backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
              hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
          }
      ]
  };


  this.options = {
      cutout: '50%',
      plugins: {
          legend: {
              labels: {
                  color: textColor
              }
          }
      }
  };
}
datas:any
option:any
piechart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');
  
    // Initialize arrays to store booking amounts and admin payment amounts for each month
    const monthlyBookingAmounts = Array(12).fill(0);
    const monthlyAdminPaymentAmounts = Array(12).fill(0);
  
    // Iterate over the array of objects to accumulate booking amounts and admin payment amounts for each month
    this.allappointments.forEach((booking: { date: string | number | Date; bookingAmount: string; adminpaidAmount: any; }) => {
        const date = new Date(booking.date);
        const month = date.getMonth(); // Get the month index (0-indexed)
        const bookingAmount = parseInt(booking.bookingAmount);
        monthlyBookingAmounts[month] += bookingAmount;
        if(booking.adminpaidAmount){
           const adminPaymentAmount = booking.adminpaidAmount ? parseInt(booking.adminpaidAmount) : 0;// If adminpaidAmount is undefined, default to 0
        monthlyAdminPaymentAmounts[month] += adminPaymentAmount;
        }
      
    });
    console.log("monthlyAdminPaymentAmounts", monthlyAdminPaymentAmounts); // Debugging statement
  
    // Populate the data for the chart
    this.datas = {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        datasets: [
            {
                label: 'Booking Amount',
                backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                borderColor: documentStyle.getPropertyValue('--blue-500'),
                data: monthlyBookingAmounts
            },
            {
                label: 'Admin Payment Amount',
                backgroundColor: documentStyle.getPropertyValue('--pink-500'),
                borderColor: documentStyle.getPropertyValue('--pink-500'),
                data: monthlyAdminPaymentAmounts
            }
        ]
    };
  
    // Set chart options
    this.option = {
        maintainAspectRatio: false,
        aspectRatio: 0.8,
        plugins: {
            legend: {
                labels: {
                    color: textColor
                }
            }
        },
        scales: {
            x: {
                ticks: {
                    color: textColorSecondary,
                    font: {
                        weight: 500
                    }
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            },
            y: {
                ticks: {
                    color: textColorSecondary
                },
                grid: {
                    color: surfaceBorder,
                    drawBorder: false
                }
            }
        }
    };
  }
  

}
