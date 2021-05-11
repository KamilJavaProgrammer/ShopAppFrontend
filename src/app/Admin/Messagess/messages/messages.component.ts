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

  recipient: User;

  pipe = new DatePipe('pl-PL');


  constructor(private ngxService: NgxUiLoaderService, private messageService: MessageService, private userService: UserService) {}

  ngOnInit(): void {
    this.ngxService.startLoader('2');

    this.userService.GetAdminData().subscribe(value => {

        this.admin = value;


        this.userService.GetAllUsers().subscribe(users => {

          users.forEach((user, index) => {
            if (user.id === this.admin.id)
            {
              users.splice(index, 1);
            }
          });
          this.users = users;
          this.ChangeUser(this.users[0]);
        });

      },
      error => {
        console.log(error);
      });



    const stompClient = this.messageService.connect();
    stompClient.connect({}, frame => {


      stompClient.subscribe('/topic/' + this.admin.username, response => {

        const message: Message = JSON.parse(response.body);
        message.login = false;

        this.messages.push(message);
      });
      this.ngxService.stopLoader('2');
    });
  }


  SendMessage(): void{


    if (this.message !== null && this.message !== '')
    {
      const now = Date.now();

      const myFormattedDate = this.pipe.transform(now, 'dd.MM.yyyy, HH:mm:ss');
      const messageToSend = new Message(this.message, this.admin, myFormattedDate, this.recipient.username );
      messageToSend.login = true;
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


  ChangeUser(user: User): void {
    this.recipient = this.users[0];


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
    console.log(this.messages);
  }

  Search(event: any): void {
    const spanItems = document.querySelectorAll('.tr-data');
    const searchItem = event.target.value.toLowerCase();

    spanItems.forEach(value => {
      if (value.textContent.toLowerCase().indexOf(searchItem) !== -1) {

        value.closest<HTMLElement>('.tr-data').style.display = '';

      } else {
        value.closest<HTMLElement>('.tr-data').style.display = 'none';
      }

    });

  }


}
