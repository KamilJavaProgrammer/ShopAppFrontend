import {Component, ComponentFactoryResolver, ViewChild, ViewContainerRef} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {NavigationEnd, Router} from '@angular/router';
import {TestService} from './test.service';
import {TestDynamicComponentComponent} from './test-dynamic-component/test-dynamic-component.component';
declare const ga: (...args: any[]) => () => void;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent {
  title = 'Aplikacja';



  @ViewChild('container', { read: ViewContainerRef })
  container!: ViewContainerRef;
  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }
  add(): void {
    // create the component factory
    const dynamicComponentFactory = this.componentFactoryResolver.resolveComponentFactory(TestDynamicComponentComponent);
    // add the component to the view
    const componentRef = this.container.createComponent(dynamicComponentFactory);
  }

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



  // constructor(public router: Router) {
  //   // this.router.events.subscribe(event => {
  //   //   if (event instanceof NavigationEnd) {
  //   //     ga('set', 'page', event.urlAfterRedirects);
  //   //     ga('send', 'pageview');
  //   //   }
  //   // });
  // }


}

