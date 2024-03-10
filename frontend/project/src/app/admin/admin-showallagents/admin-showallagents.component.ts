import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-admin-showallagents',
  templateUrl: './admin-showallagents.component.html',
  styleUrls: ['./admin-showallagents.component.css'],
})
export class AdminShowallagentsComponent {
  isBlocked: boolean = false;
  totalagents:any[]=[]
  agents: any = [];
  totalrecords!:string
  searchTerm!:string
  
  constructor(private service: AdminService, private toastr: ToastrService) {}

  ngOnInit() {
   this.allAgents()
  }
  block(data: any) {
    this.service.agentBlock(data).subscribe((result) => {
      data.is_blocked = !data.is_blocked;
    });
  }
  verify(data: any) {
    this.service.agentVerify(data).subscribe((result) => {
      data.is_verified = !data.is_verified;
    });
  }
  paginate(event:any) {
    this.agents=[]
    let currenpage=event.page;
    let count=event.first;
    let currentPageData = this.totalagents.slice(count, (currenpage + 1) * 5);

    currentPageData.forEach((data)=>{
      this.agents.push(data)
    })
   
    console.log("data is==>",currentPageData)
    //event.first = Index of the first record
    //event.rows = Number of rows to display in new page
    //event.page = Index of the new page
    //event.pageCount = Total number of pages
    console.log("====>",event.first)
    console.log(event.page)
}
async allAgents() {
  try {
    const result =await this.service.getAllAgents().toPromise();
    if (result) {
      this.agents = [...result];
      console.log("==>", this.agents, "and length is==>", this.agents.length);
      this.totalagents = this.agents;
      this.totalrecords = (this.totalagents.length + 1).toString();
      const newrecords=this.totalagents.slice(0,5)
      this.agents=[...newrecords]
      
    }
  } catch (error) {
    // Handle error
    console.error("Error fetching agents:", error);
  }
}
async searchAgents(event: any) {
  // Check if the Enter key was pressed (keyCode 13)
  let data=event.target.value
  if(data==""){
   return this.allAgents()
  }
    try {
      // Fetch agents based on the search term using regular expressions
      console.log("==>",data)
      let result :any= await this.service.searchAgents(data).subscribe((res)=>{
        this.agents=[...res]
      })
      this.agents=[...result]
     
    } catch (error) {
      // Handle error
      console.error('Error searching agents:', error);
    }
  
}

}
