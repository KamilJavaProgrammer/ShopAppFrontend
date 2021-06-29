import {Component, Input, OnInit} from '@angular/core';
import {Message, MessageService, MessageState} from '../../../../Services/message.service';
import {User, UserService} from '../../../../Services/user.service';
import {DatePipe} from '@angular/common';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Role} from '../../../../Enums/role.enum';

@Component({
  selector: 'app-message-component',
  templateUrl: './message-component.component.html',
  styleUrls: ['./message-component.component.css']
})
export class MessageComponentComponent implements OnInit {

  @Input()
  name: string;


  stateMessage: string = MessageState.displayed;
  messages: Array<Message> = [];
  users: Array<User> = [];
  message = '';
  admin: User;
  recipient: User = ({});
  pipe = new DatePipe('pl-PL');


  constructor(private ngxService: NgxUiLoaderService, private messageService: MessageService, private userService: UserService) {}

  ngOnInit(): void {
    window.scrollTo(0, 0);

    this.ngxService.startLoader('2');

    // this.userService.GetAdminData(this.name, Role.ADMIN).subscribe( value => {
    this.userService.GetAdminData(Role.ADMIN).subscribe( value => {

      this.admin = value;


      this.userService.GetAllUsers(Role.ADMIN).subscribe(users => {

          users.forEach((user, index) => {
            if (user.id === this.admin.id)
            {
              users.splice(index, 1);
            }
          });
          this.users = users;


          const stompClient = this.messageService.connect();
          stompClient.connect({}, frame => {


            stompClient.subscribe('/topic/' + this.admin.username, response => {
              console.log(JSON.parse(response.body));

              const message: Message = JSON.parse(response.body);
              message.login = false;

              if (message.author.id === this.recipient.id){
                message.state = MessageState.displayed;
                this.messages.push(message);
              }
              else
              {
                users.forEach(user => {
                  if (user.id === message.author.id)
                  {
                    message.state = MessageState.notDisplayed;
                    user.messages.push(message);
                  }
                });
              }
            });
          });

        },
        error => {
          console.log(error);
        });


      this.ngxService.stopLoader('2');
    });
  }


  SendMessage(): void {

    if (this.recipient.id !== null && this.recipient.id !== '' && this.recipient.id !== undefined && this.recipient.id !== 'undefined') {

        if (this.message !== null && this.message !== '') {
          const now = Date.now();

          const myFormattedDate = this.pipe.transform(now, 'dd.MM.yyyy, HH:mm:ss');
          const messageToSend = new Message(this.message, this.admin, myFormattedDate, this.recipient);
          messageToSend.state = MessageState.notDisplayed;

          messageToSend.login = true;
          this.messages.push(messageToSend);
          this.messageService.SendMessageToServer(messageToSend);
          this.message = '';
        }
        else {
          alert('Pusta wiadomość');
        }
      }
    else
      {
        alert('Wybierz Odbiorce wiadomości!');
        this.Clear();
      }

  }

 Clear(): void
 {
   this.message = '';
 }


  setScrollBottom(): void {
    const scrolledDiv = document.getElementById('messageDiv');
    scrolledDiv.scrollTop = scrolledDiv.scrollHeight;
  }


  ChangeUser(user: User, event: any): void{

    Array.from(document.querySelectorAll<HTMLElement>('#peopleList'),  li => li.style.backgroundColor = 'white');



    const div: HTMLElement = event.currentTarget;
    div.style.backgroundColor = '#e8f6ff';



    this.recipient = user;

    this.messages = [];

    user.messages.forEach(value => {

      if (value.recipient.id === this.admin.id) {
        value.login = false;
        value.state = MessageState.displayed;
        // this.messageService.ChangeMessagesStatus(user.messages).subscribe();
        this.messages.push(value);
      }

    });


    if (this.admin.messages.length > 0)
    {
      this.admin.messages.forEach(value => {

        if (value.recipient.id === user.id) {
          value.login = true;
          this.messages.push(value);
        }
      });

    }

    this.messages =  this.messageService.SortMessage(this.messages);
    console.log(this.messages);
  }

  Search(event: any): void {
    const spanItems = document.querySelectorAll('h5');
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
