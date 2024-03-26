import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-showalluser',
  templateUrl: './admin-showalluser.component.html',
  styleUrls: ['./admin-showalluser.component.css']
})
export class AdminShowalluserComponent {
  isBlocked: boolean = false;
  totalusers:any[]=[]
  totalrecords !:number
  users:any=[]
  searchTerm:string=''
  constructor(private service:AdminService,private toastr:ToastrService){}

  ngOnInit(){
  this.showUsers()
    
  }
  block(data:any){
    
    this.service.userBlock(data).subscribe((result)=>{
      data.is_blocked=!data.is_blocked;

    })
  }
 
  paginate(event:any) {
    this.users=[]
    let currenpage=event.page;
    let count=event.first;
    let currentPageData = this.totalusers.slice(count, (currenpage + 1) * 5);
    currentPageData.forEach((data)=>{
      this.users.push(data)
    })
   
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
}
 async showUsers(){
  try {
    const result =await this.service.getAllUsers().toPromise();
    if (result) {
      this.users = [...result];
      this.totalusers = this.users;
      this.totalrecords = (this.totalusers.length + 1);
      const newrecords=this.totalusers.slice(0,5)
      this.users=[...newrecords]
      
    }
  } catch (error) {
    // Handle error
    console.error("Error fetching agents:", error);
  }
 }
 async searchUsers(event: any) {
  // Check if the Enter key was pressed (keyCode 13)
  let data=event.target.value
  if(data==""){
   return this.showUsers()
  }
    try {
      // Fetch agents based on the search term using regular expressions
      console.log("==>",data)
      let result :any= await this.service.searchUser(data).subscribe((res)=>{
        this.users=res
      })
      this.users=[...result]
     
    } catch (error) {
      // Handle error
      console.error('Error searching agents:', error);
    }
  
}
}