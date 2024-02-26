import { Component, OnInit } from '@angular/core';
import { CommonService } from 'src/app/Services/common.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  authenticated: boolean = false;
  constructor(private service: CommonService) {}

  ngOnInit() {
    if (this.service.getUserTokenFromLocalStorage()) {
      this.authenticated = true;
    }
  }
}
