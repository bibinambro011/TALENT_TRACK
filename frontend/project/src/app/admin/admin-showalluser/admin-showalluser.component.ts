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

  users:any=[]
  constructor(private service:AdminService,private toastr:ToastrService){}

  ngOnInit(){
    this.service.getAllUsers().subscribe((result:any[])=>{
      if(result){
       result.forEach((data)=>{
        this.users.push(data)
       })
      }
    })
  }
  block(data:any){
    
    this.service.userBlock(data).subscribe((result)=>{
      data.is_blocked=!data.is_blocked;

    })
  }
 
 
}
