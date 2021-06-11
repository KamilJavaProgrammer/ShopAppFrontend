import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-user-setting-account',
  templateUrl: './user-setting-account.component.html',
  styleUrls: ['./user-setting-account.component.css']
})
export class UserSettingAccountComponent implements OnInit, OnDestroy {
  date: string;
  userPassword = '••••••••';
  userLogin: any;
  userEmail: any;

  constructor(private ngxService: NgxUiLoaderService) {
    document.getElementById('userSettings').style.color = 'crimson';
    document.getElementById('userDashboardCard').style.display = 'none';


  }

  ngOnInit(): void {
    this.ngxService.startLoader('2');
    setTimeout(() => {
      this.ngxService.stopLoader('2');
    }, 500);
  }

  ngOnDestroy(): void {
    document.getElementById('userSettings').style.color = 'black';
    document.getElementById('userDashboardCard').style.display = 'block';


  }

}
