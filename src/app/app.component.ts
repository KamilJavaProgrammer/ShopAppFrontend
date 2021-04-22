import { Component } from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
declare const ga: (...args: any[]) => () => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Aplikacja';

  // constructor(public router: Router, private titleApp: Title) {
  //   titleApp.setTitle(this.title);
  //
  //   this.router.events.subscribe(event => {
  //
  //     if (event instanceof NavigationEnd) {
  //
  //
  //
  //       ga;
  //       ga('set', 'page', event.urlAfterRedirects);
  //       ga('send', 'pageview');
  //     }
  //   });
  // }



  constructor(public router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        ga('set', 'page', event.urlAfterRedirects);
        ga('send', 'pageview');
      }
    });
  }


}

