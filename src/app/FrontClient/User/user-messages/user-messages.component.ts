import { Component, OnInit } from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Message, MessageService} from '../../../message.service';
import {User, UserService} from '../../../user.service';
import DateTimeFormat = Intl.DateTimeFormat;
import {DatePipe} from '@angular/common';

import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/pl';
registerLocaleData(localeFr, 'pl');

@Component({
  selector: 'app-user-messages',
  templateUrl: './user-messages.component.html',
  styleUrls: ['./user-messages.component.css']
})
export class UserMessagesComponent implements OnInit {

  messages: Array<Message> = [];
  message = '';
  user: User;
  pipe = new DatePipe('pl-PL');


  constructor(private ngxService: NgxUiLoaderService, private messageService: MessageService, private userService: UserService) {}

  ngOnInit(): void {
    this.ngxService.startLoader('2');

    this.userService.GetUserFromServerWithJwt().subscribe(value => {
        this.user = value;
      },
      error => {
        console.log(error);
      });


    const stompClient = this.messageService.connect();
    stompClient.connect({}, frame => {

      stompClient.subscribe('/topic/user', message => {

        this.messages.push(JSON.parse(message.body));

      });
      this.ngxService.stopLoader('2');

    });
  }

  SendMessage(): void{
    if (this.message !== null && this.message !== '')
    {

      const now = Date.now();
      const myFormattedDate = this.pipe.transform(now, 'hh:mm | dd.mm.yyyy');

      const messageToSend = new Message(this.message, this.user, myFormattedDate);
      this.messages.push(messageToSend);
      this.messageService.SendMessageUser(messageToSend);
      this.message = '';
    }
    else
    {
      alert('Pusta wiadomość');
    }

  }

   setScrollBottom(): void {
    const scrolledDiv = document.getElementById('messageDiv');
    scrolledDiv.scrollTop = scrolledDiv.scrollHeight;
  }



}
