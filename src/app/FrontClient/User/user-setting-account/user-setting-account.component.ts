import { Component, OnInit } from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-user-setting-account',
  templateUrl: './user-setting-account.component.html',
  styleUrls: ['./user-setting-account.component.css']
})
export class UserSettingAccountComponent implements OnInit {
  date: string;
  userPassword = '••••••••';
  userLogin: any;
  userEmail: any;

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.startLoader('2');
    setTimeout(() => {
      this.ngxService.stopLoader('2');
    }, 500);
  }

}
