import {Component, Input, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';

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

  constructor(config: NgbDropdownConfig, private router: Router, private ngxService: NgxUiLoaderService) {
   config.autoClose = false;
  }

  ngOnInit(): void {
     // this.router.navigate(['/admin', { outlets: {'administrator': ['panel']}}]);
    this.ngxService.startLoader('1');
    setTimeout(() => {
      this.ngxService.stopLoader('1');
    }, 500);
  }


  LogOut(): void {
    this.router.navigateByUrl('admin/logowanie');
     sessionStorage.clear();

  }
}


