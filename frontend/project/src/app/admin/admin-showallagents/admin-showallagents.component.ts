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
 

  agents: any = [];
  constructor(private service: AdminService, private toastr: ToastrService) {}

  ngOnInit() {
    this.service.getAllAgents().subscribe((result: any[]) => {
      if (result) {
        result.forEach((data) => {
          this.agents.push(data);
        });
      }
    });
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
}
