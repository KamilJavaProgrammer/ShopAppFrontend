import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router, Scroll} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AuthGuard} from '../../../auth.guard';
import {AccountOption, AuthService} from '../../../auth.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {HomeShopComponent} from '../../../FrontMain/home-shop/home-shop.component';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit, OnDestroy{


  @ViewChild('logOutAlert')
  logOutAlert: TemplateRef<any>;
  nameOfUser: string;

  menuCounter = 0;



  constructor(private router: Router,
              private modalService: BsModalService,
              private authGuard: AuthGuard,
              private authService: AuthService,
              private ngxService: NgxUiLoaderService,
              private homeShopComponent: HomeShopComponent) {}



  ngOnInit(): void {

    this.ngxService.startLoader('1');
    this.setFront();
    this.nameOfUser  = this.authGuard.DecodeJwt();
    this.ngxService.stopLoader('1');


  }

  ngOnDestroy(): void {
    document.getElementById('article').style.display = 'block';
  }


  setFront(): void {
    document.getElementById('article').style.display = 'none';
  }

  CloseAlertModal(): void {
    this.modalService.hide();
  }

  LogOut(): void {
    this.authService.logout();
    this.modalService.show(this.logOutAlert, {class: 'modal-lg'});
    this.router.navigate(['/shop']);
    document.getElementById('mainAnchor').scrollIntoView({behavior: 'smooth'});

    this.homeShopComponent.account = AccountOption[0].toString();
   }


  ShowMenuSmallDevices(): void {
    if (this.menuCounter === 0){
      this.menuCounter = 1;
      document.getElementById('menu').style.display = 'block';
    }
    else {
      this.menuCounter = 0;
      document.getElementById('menu').style.display = 'none';
    }
  }
}
