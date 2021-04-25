import {Component, Input, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';

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

  constructor(config: NgbDropdownConfig,private router: Router) {
   config.autoClose = false;
  }

  ngOnInit(): void {
    document.getElementById('navbar123').style.display = 'none';
     this.router.navigate(['/admin', { outlets: {'administrator': ['panel']}}]);

  }


  LogOut(): void {
    this.router.navigateByUrl('admin/logowanie');
     sessionStorage.clear();

  }
}


