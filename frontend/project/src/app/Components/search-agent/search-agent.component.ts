import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SharedService } from 'src/app/Services/shared.service';
import { UserService } from 'src/app/Services/user.service';


@Component({
  selector: 'app-search-agent',
  templateUrl: './search-agent.component.html',
  styleUrls: ['./search-agent.component.css']
})
export class SearchAgentComponent {
  constructor(private service:UserService,private sharedService:SharedService,private router:Router,){}
  visible:boolean=true
  showsidebar:boolean=false
  showcomponent:boolean=false
  sidebarVisible:boolean=true
  agents:any=[]

agentdata:any={}




  ngOnInit(){
    this.showsidebar=true
    this.showcomponent=false
    this.service.getAllverifiedAgents().subscribe((result: any[]) => {
      if (result) {
        result.forEach((data) => {
          this.agents.push(data);
        });
      }
    });
    this.visible=true
    this.showcomponent=false
  }
  getagent(id:any){
    this.showsidebar=false
    this.sharedService.getAgentdetails(id).subscribe((res)=>{
      if(res){
        res.forEach((data:any)=>{
          this.agentdata.firstName=data.firstName
          this.agentdata.lastName=data.lastName
          this.agentdata.image=data.image
          this.agentdata.id=data._id;
          this.agentdata.email=data.email
          this.agentdata.experience=data.experience;
          this.agentdata.clubConnections=data.clubConnections
          
          this.router.navigate(["/agentprofile"])
        })

      }
    })
    this.showcomponent=true
    this.visible=false;
  }

  // searchimg agents based on category
  searchagent(data:string){
    this.service.agentCategory(data).subscribe((res:any) =>{
      if(res){
        this.agents=[]
        res.forEach((agent:any)=>{ 
          this.agents.push(agent)
        })
      }
    })
    
  }
  //searching agents based on name
 
  onKeyDownEvent(event: any){
    console.log(event.target.value);
    this.service.getagentByName(event.target.value).subscribe(agent =>{
      if(agent){
        this.agents=[]
        agent.forEach((res:any)=>{ 
          this.agents.push(res)
        })
      }
    })
 
 }
 
 ngOnDestroy(){
  
 }
}
  