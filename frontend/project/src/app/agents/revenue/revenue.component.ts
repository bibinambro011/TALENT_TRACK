import { Component } from '@angular/core';
import { AgentService } from 'src/app/Services/agent.service';

@Component({
  selector: 'app-revenue',
  templateUrl: './revenue.component.html',
  styleUrls: ['./revenue.component.css']
})
export class RevenueComponent {
  data: any;
  datas: any;
  options: any;
  option: any;
  allappointments: any;
  usercount: number = 90;
  agentcount: number = 0; // Initialize to 0
  appointmentcount: number = 0; // Initialize to 0
  agentId = localStorage.getItem("agentId") as string;
  Confirmed:number=0
  Consulted:number=0
  agent_cancelled:number=0
  cancelled:number=0

  constructor(private service: AgentService) {}

  ngOnInit() {
    this.totalappointments().then(() => {
      this.callChart();
      this.piechart();
    });
  }

  async totalappointments() {
    await this.service.getAllslotDetails(this.agentId).toPromise().then((res) => {
      this.allappointments = res
      this.appointmentcount = this.allappointments.length;
      if(this.allappointments instanceof Array){
     
        this.allappointments .forEach((info)=>{
          console.log("inside array ", res)
         if(info.status=='confirmed'){
         
          this.Confirmed+=1
         }else if(info.status=='consulted'){
          this.Consulted+=1
         }else if(info.status=="agent cancelled"){
          this.agent_cancelled+=1
         }else if(info.status=="cancelled"){
          this.cancelled+=1
         }
        })
      } // Update appointment count
    });
   console.log("consulted=>",this.Consulted)
   console.log("confirmed==>",this.Confirmed)
   console.log("agent cancelled==>",this.agent_cancelled)
   console.log(" cancelled==>",this.cancelled)
  }

  callChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    this.data = {
      labels: ['confirmed','consulted','user cancelled', 'agent cancelled'],
      datasets: [
        {
          data: [this.Confirmed, this.Consulted, this.cancelled,this.agent_cancelled],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'),documentStyle.getPropertyValue('--red-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'),documentStyle.getPropertyValue('--red-400')]
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

  piechart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    const monthlyBookingAmounts = Array(12).fill(0);

    this.allappointments.forEach((booking: any) => {
      const date = new Date(booking.date);
      const month = date.getMonth();
      const bookingAmount = Number(booking.bookingamount); // Use 'booking.bookingamount' instead of 'booking.bookingAmount'
      monthlyBookingAmounts[month] += bookingAmount;
    });

    this.datas = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [
        {
          label: 'Agent Income by Month',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          borderColor: documentStyle.getPropertyValue('--blue-500'),
          data: monthlyBookingAmounts
        },
      ]
    };

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
