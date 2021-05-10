import { Component, OnInit } from '@angular/core';
import {Message, MessageService} from '../../../message.service';
import {User, UserService} from '../../../user.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';


import {DatePipe, registerLocaleData} from '@angular/common';
import localeFr from '@angular/common/locales/pl';
registerLocaleData(localeFr, 'pl');

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: Array<Message> = [];
  users: Array<User> = [];
  message = '';
  admin: User;

  pipe = new DatePipe('pl-PL');


  constructor(private ngxService: NgxUiLoaderService, private messageService: MessageService, private userService: UserService) {}

  ngOnInit(): void {
    this.ngxService.startLoader('2');

    this.userService.GetAdminData().subscribe(value => {

        this.admin = value;

      },
      error => {
        console.log(error);
      });

    this.userService.GetAllUsers().subscribe(users => {
      this.users = users;
      console.log(users);
    });


    const stompClient = this.messageService.connect();
    stompClient.connect({}, frame => {

      stompClient.subscribe('/topic/admin', message => {

         this.messages.push(JSON.parse(message.body));
      });
      this.ngxService.stopLoader('2');
    });
  }


  SendMessage(): void{


    if (this.message !== null && this.message !== '')
    {
      const now = Date.now();
      const myFormattedDate = this.pipe.transform(now, 'short');
      const messageToSend = new Message(this.message, this.admin, myFormattedDate);
      this.messages.push(messageToSend);
      this.messageService.SendMessageAdmin(messageToSend);
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


  ChangeUser(user: User): void {
    this.messages = [];
    user.messages.forEach(value => {
      value.login = false;
      this.messages.push(value);

    });

    if (this.admin.messages.length > 0)
    {
      this.admin.messages.forEach(value => {
         value.login = true;
         this.messages.push(value);
      });

    }

    this.messages =  this.messageService.SortMessage(this.messages);

  }
}
