import { Component } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-search-agent',
  templateUrl: './search-agent.component.html',
  styleUrls: ['./search-agent.component.css']
})
export class SearchAgentComponent {
  constructor(private service:UserService){}
  agents:any=[]

  ngOnInit(){
    this.service.getAllverifiedAgents().subscribe((result: any[]) => {
      if (result) {
        result.forEach((data) => {
          this.agents.push(data);
        });
      }
    });
  }
}
