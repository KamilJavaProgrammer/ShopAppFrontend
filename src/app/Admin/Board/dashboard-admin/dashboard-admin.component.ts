import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbDropdownConfig} from '@ng-bootstrap/ng-bootstrap';
import {Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {delay} from 'rxjs/operators';
import set = Reflect.set;



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


  constructor(config: NgbDropdownConfig, private router: Router, private ngxService: NgxUiLoaderService) {
    config.autoClose = false;
  }

  ngOnInit(): void {

    // this.router.navigate(['/admin', { outlets: {'administrator': ['panel']}}]);
    this.ngxService.startLoader('1');
    setTimeout(() => {
      this.ngxService.stopLoader('1');
    }, 500);


    // const icon: HTMLElement =  document.getElementById('testkoperta');
    //
    // this.refreshIntervalId =   setInterval(() => {
    //
    //   document.getElementById('testkoperta').style.color = 'yellow';
    //   setTimeout( () => {
    //     document.getElementById('testkoperta').style.color = 'white';
    //   }, 800);
    //
    //   }, 2000);


  }


  ngOnDestroy(): void {
  }


  LogOut(): void {
    this.router.navigateByUrl('admin/logowanie');
    sessionStorage.clear();

  }

  //
  // clear(): void{
  //   clearInterval(this.refreshIntervalId);
  // }

   ViewMenu(): any {


    this.i = 0;

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
