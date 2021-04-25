import {Component, Input, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  adminName: string;

  shop: boolean;
  service: boolean;
  bookkeeping: boolean;
  staff: boolean;
  administration: boolean;
  reports: boolean;
  statistics: boolean;
  messages: boolean;
  users: boolean;
  settings: boolean;

  constructor(config: NgbDropdownConfig) {
   config.autoClose = false;
  }

  ngOnInit(): void {
    document.getElementById('navbar123').style.display = 'none';

  }


  LogOut(): void {
     sessionStorage.clear();
  }
}


