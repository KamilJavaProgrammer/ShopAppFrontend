import { Component, OnInit } from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.startLoader('2');
    setTimeout(() => {
      this.ngxService.stopLoader('2');
    }, 500);
  }

}
