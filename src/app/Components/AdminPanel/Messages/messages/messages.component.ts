import {Component, ElementRef, OnInit} from '@angular/core';
import {DatePipe, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/pl';
registerLocaleData(localeFr, 'pl');

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  constructor() {}
  ngOnInit(): void {}

}
