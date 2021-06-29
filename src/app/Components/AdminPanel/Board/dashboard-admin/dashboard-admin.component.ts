import {Component, Input, OnDestroy, OnInit, ViewChildren} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {delay} from 'rxjs/operators';
import set = Reflect.set;
import {CollapseComponent} from 'angular-bootstrap-md';



@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit, OnDestroy {
  adminName: string;
  refreshIntervalId: any;
  i = 0;
  j = 0;
  collapseState = true;
  open: boolean;
  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];


  constructor(config: NgbDropdownConfig, private router: Router, private ngxService: NgxUiLoaderService) {
    config.autoClose = false;
  }

  ngOnInit(): void {

    this.ngxService.stop();
    this.open = false;
    // this.router.navigate(['/admin', { outlets: {'administrator': ['panel']}}]);

  }


  ngOnDestroy(): void {
  }


  LogOut(): void {
    this.router.navigateByUrl('admin/logowanie');
    sessionStorage.clear();

  }



  ChangeCollapseState(): void{
    Promise.resolve().then(() => {
      this.collapses.forEach((collapse: CollapseComponent) => {
        if (!collapse.isCollapsed)
        {
          collapse.toggle();
        }
      });
    });

  }


   ViewMenu(): any {


     const x = window.matchMedia('(max-width: 576px)');

     if (x.matches) {

       this.i = 0;

       const d = document.querySelectorAll('.sidebar-menu');
       const e = document.querySelectorAll('.nav-link-name');
       const k = document.getElementById('outlet-container');
       const lista = document.getElementById('sidebar-menu-list');


       d.forEach(value => {
         value.classList.toggle('full-side-bar-small-devices');
         value.classList.remove('flowHide');
       });

       lista.classList.toggle('sidebar-menu-ul-small-devices');
       lista.classList.toggle('sidebar-menu-ul');


       setTimeout(() => {

         e.forEach(value => {
           value.classList.toggle('name-hide');
         });


       }, 150);

       k.classList.toggle('small-size');
       k.classList.toggle('big-size');
     }
     else {


       if (this.open === false) {
         this.open = true;
         this.SwitchMenu();
       }

       else if (this.open === true) {
         this.open = false;
         this.ChangeCollapseState();
         setTimeout(() => {
           this.SwitchMenu();
         }, 400);
       }
     }
   }



  SwitchMenu(): void{
    const d = document.querySelectorAll('.sidebar-menu');
    const e = document.querySelectorAll('.nav-link-name');
    const k = document.getElementById('outlet-container');


    d.forEach( value => {
      value.classList.toggle('full-side-bar');
      value.classList.remove('flowHide');
    });

    setTimeout(() => {

      e.forEach(value => {
        value.classList.toggle('name-hide');
      });

    }, 150);

    k.classList.toggle('small-size');
    k.classList.toggle('big-size');
  }





}
