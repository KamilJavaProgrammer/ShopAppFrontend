import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router, Scroll} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AuthGuard} from '../../../Guard/auth.guard';
import {AuthService} from '../../../Services/auth.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {HomeComponent} from '../../MainApp/start/home/home.component';
import {AccountOption} from '../../../Enums/account-option.enum';

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
  ip: number;



  constructor(private router: Router,
              private modalService: BsModalService,
              private authGuard: AuthGuard,
              private authService: AuthService,
              private ngxService: NgxUiLoaderService,
              private homeShopComponent: HomeComponent) {


  }



  ngOnInit(): void {

    // this.ngxService.startLoader('1');
    this.setFront();
    this.nameOfUser  = this.authGuard.DecodeJwt();
    // this.ngxService.stopLoader('1');
    this.ngxService.stop();

    document.getElementById('userDashboard').style.color = 'crimson';
    this.authService.getIPAddress().subscribe(value => {
      this.ip = value.ip;
    });

  }

  ngOnDestroy(): void {
    document.getElementById('userDashboard').style.color = 'black';
    document.getElementById('articleRouter').style.display = 'block';

  }


  setFront(): void {
    document.getElementById('articleRouter').style.display = 'none';
  }

  CloseAlertModal(): void {
    this.modalService.hide();
  }

  LogOut(): void {
    this.authService.logout();
    this.modalService.show(this.logOutAlert, {class: 'modal-lg'});
    this.router.navigate(['/sklep']);
    document.getElementById('home').scrollIntoView({behavior: 'smooth'});

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


  ChangeColor(event): void{
        const array: NodeListOf<HTMLElement> = document.querySelectorAll('.menuOption');
        array.forEach(value => {
          value.style.color = 'black';
        });
        event.currentTarget.style.color = 'crimson';
  }
}
