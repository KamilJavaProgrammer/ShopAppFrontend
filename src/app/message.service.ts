import { Injectable } from '@angular/core';
import {HttpClient, HttpEvent, HttpHandler, HttpRequest} from '@angular/common/http';
import {User} from './user.service';
import {daLocale} from 'ngx-bootstrap/chronos';
const SockJs = require('sockjs-client');
const Stomp = require('stompjs');


@Injectable({
  providedIn: 'root'
})
export class MessageService {


  port = '8088';
  urlMessagesADMIN = 'http://localhost:' + this.port + '/messagesAdmin';
  urlMessages = 'http://localhost:' + this.port + '/messages';

  constructor(private httpClient: HttpClient) {

  }


  public connect(): any {
    const socket = new SockJs(`http://localhost:8088/socket`);
    const stompClient = Stomp.over(socket);
    return stompClient;
  }

  SendMessageUser(body: any): any{
    return this.httpClient.post(this.urlMessages, body).subscribe(value => {
    });

  }


  SendMessageAdmin(body: any): any{
    return this.httpClient.post(this.urlMessagesADMIN, body).subscribe(value => {
    });

  }


  compareYear(a: Array<string>, b: Array<string>, timeA: Array<string>, timeB: Array<string>): number{

    if ( +a[2] < +b[2]) {
      return -1;
    }
    if ( +a[2] > +b[2]) {
      return 1;
    }
    if (+a[2] === +b[2]){
     return  this.compareMonth(a, b, timeA, timeB);

    }
  }


  compareMonth(a: Array<string>, b: Array<string>, timeA: Array<string>, timeB: Array<string>): number{

    if ( +a[1] < +b[1]) {
      return -1;
    }
    if ( +a[1] > +b[1]) {
      return 1;
    }
    if (+a[1] === +b[1]){
       return this.compareDay(a, b, timeA, timeB);
    }

  }

  compareDay(a: Array<string>, b: Array<string>, timeA: Array<string>, timeB: Array<string>): number{

        if ( +a[0] < +b[0]) {
      return -1;
    }
        if ( +a[0] > +b[0]) {
      return 1;
    }
        if (+a[0] === +b[0]){
      return this.compareHour(timeA, timeB);

    }

  }


  compareHour(a: Array<string>, b: Array<string>): number{

         if ( +a[0] < +b[0]) {
      return -1;
    }
         if ( +a[0] > +b[0]) {
      return 1;
    }
         if (+a[0] === +b[0]){
      return  this.compareMinute(a, b);

    }
  }


  compareMinute(a: Array<string>, b: Array<string>): number{

    if ( +a[1] < +b[1]) {
      return -1;
    }
    if ( +a[1] > +b[1]) {
      return 1;
    }
    if (+a[1] === +b[1]){
      return this.compareSecond(a, b);
    }

  }

  compareSecond(a: Array<string>, b: Array<string>): number{

    if ( +a[2] < +b[2]) {
      return -1;
    }
    if ( +a[2] > +b[2]) {
      return 1;
    }
    if (+a[2] === +b[2]){
      return 0;

    }


  }




  compareDate(a: Message, b: Message): number {
    const datetimeA =  a.date.split(', ');
    const datetimeB =  b.date.split(', ');

    const dateA: Array<string> = datetimeA[0].split('.');
    const dateB: Array<string> = datetimeB[0].split('.');

    const timeA: Array<string> = datetimeA[1].split(':');
    const timeB: Array<string> = datetimeB[1].split(':');


    dateA.forEach((value, index) => {
      if (value.startsWith('0'))
      {
        dateA[index] = value.slice(1, value.length);
      }
    });

    dateB.forEach((value, index) => {
      if (value.startsWith('0'))
      {
        dateB[index] = value.slice(1, value.length);
      }
    });


    timeA.forEach((value, index) => {
      if (value.startsWith('0'))
      {
        timeA[index] = value.slice(1, value.length);
      }
    });

    timeB.forEach((value, index) => {
      if (value.startsWith('0'))
      {
        timeB[index] = value.slice(1, value.length);
      }
    });

    return  this.compareYear(dateA, dateB, timeA, timeB);
  }


  SortMessage(messages: Array<Message>): Array<Message> {
    return messages.sort((a, b) => this.compareDate(a, b));
  }


}

export class  Message {
  messageText?: string;
  author?: User;
  date?: string;
  state?: string;
  login?: boolean;
  recipient?: string;


  constructor(messageText: string, author?: User, date?: string, recipient?: string, state?: string) {
    this.messageText = messageText;
    this.author = author;
    this.date = date;
    this.recipient = recipient;
    this.state = state;
  }

}


