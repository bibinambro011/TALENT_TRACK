import { Component } from '@angular/core';
import { AdminService } from 'src/app/Services/admin.service';
import * as XLSX from "xlsx"


@Component({
  selector: 'app-admin-appointments',
  templateUrl: './admin-appointments.component.html',
  styleUrls: ['./admin-appointments.component.css']
})
export class AdminAppointmentsComponent {
  addedslots:any=[]
  totaladdedslots:any=[]
  records!:number
constructor(private service:AdminService){
  
}

  ngOnInit(){
    console.log("inside init")
    this.adminslots()
    console.log("==> slots are=",this.addedslots)
  }
 async adminslots(){
    await this.service.adminslots().toPromise().then((res)=>{
      console.log(res)
      this.addedslots=res
      this.totaladdedslots=this.addedslots
      this.records=this.totaladdedslots.length
    })
    this.defaulttransactionPaginate()
  }
  transactionpaginate(event:any){
    this.addedslots=[]
    let currenpage=event.page 
    let count=event.first 
    let currentPageData:any= this.totaladdedslots.slice(count, (currenpage + 1) * 10);
    console.log("paginate",currentPageData)
     currentPageData.forEach((data:any)=>{
      this.addedslots.push(data)
    })
  }
  defaulttransactionPaginate(){
    this.addedslots=[]
    let currenpage=1
    let count=0
    let currentPageData:any= this.totaladdedslots.slice(0,10);
    console.log("paginate",currentPageData)
     currentPageData.forEach((data:any)=>{
      this.addedslots.push(data)
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
}
