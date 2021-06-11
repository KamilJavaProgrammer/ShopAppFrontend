import {Component, OnDestroy, OnInit} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/pl';
registerLocaleData(localeFr, 'pl');

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit, OnDestroy {

       constructor() {
         document.getElementById('userMessages').style.color = 'crimson';
         document.getElementById('userDashboardCard').style.display = 'none';


       }
       ngOnInit(): void {}

  ngOnDestroy(): void {
    document.getElementById('userMessages').style.color = 'black';
    document.getElementById('userDashboardCard').style.display = 'block';


  }

}
