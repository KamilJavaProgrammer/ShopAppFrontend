import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AuthGuard} from '../../../auth.guard';
import {AuthService} from '../../../auth.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.css']
})
export class UserPanelComponent implements OnInit, OnDestroy{


  @ViewChild('logOutAlert')
  logOutAlert: TemplateRef<any>;
  nameOfUser: string;



  constructor(private router: Router,
              private modalService: BsModalService,
              private authGuard: AuthGuard,
              private authService: AuthService) {}



  ngOnInit(): void {

    this.setFront();
    this.nameOfUser  = this.authGuard.DecodeJwt();

}

  ngOnDestroy(): void {
    document.getElementById('article').style.display = 'block';
  }


  setFront(): void {
    document.getElementById('navbar123').style.display = 'none';
    document.getElementById('article').style.display = 'none';
  }

  CloseAlertModal(): void {
    this.modalService.hide();
  }

  LogOut(): void {
    this.authService.logout();
    this.modalService.show(this.logOutAlert, {class: 'modal-lg'});
    this.router.navigate(['/shop']);
  }


}
