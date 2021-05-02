import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User, UserService} from '../../user.service';
import {ProductServiceService} from '../../product-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HomeShopComponent} from '../home-shop/home-shop.component';
import {AuthService} from '../../auth.service';



@Component({
  selector: 'app-login-user',
  templateUrl: './login-user.component.html',
  styleUrls: ['./login-user.component.css']
})
export class LoginUserComponent implements OnInit, OnDestroy {
  user: User;
  username: string;
  password: string;
  sub: any;
  id: any;

  text: string;

  @ViewChild('alert')
  alert: TemplateRef<any>;

  constructor(private modalService: BsModalService,
              private userService: UserService,
              private productServiceService: ProductServiceService,
              private router: Router, private route: ActivatedRoute,
              private homeShopComponent: HomeShopComponent,
              private authService: AuthService,
  ) {  }

  ngOnInit(): void {
    this.setFront();

  }

  ngOnDestroy(): void {
    document.getElementById('article').style.display = 'block';
  }


  CloseAlertModal(): void {
    this.modalService.hide();
  }


  setFront(): void {
    document.getElementById('navbar123').style.display = 'none';
    document.getElementById('article').style.display = 'none';
  }

  Clear(): void{
    this.username = '';
    this.password = '';
  }

  ViewModalIncorrectDataLogin(): void{
    this.text = 'Niepoprawne dane logowania!';
    this.homeShopComponent.account = 'Zaloguj się';
    this.modalService.show(this.alert, {class: 'modal-lg'});
    this.Clear();
  }



  Login(): void {
    this.user = ({
      password : this.password,
      username : this.username
    });

    this.authService.LoginUser(this.user).subscribe(value => {
      if (value === true){

         this.router.navigate(['/shop', {outlets: {route4: 'konto'}}]);
         this.homeShopComponent.account = 'Twoje konto';
      }
      else
      {
        this.ViewModalIncorrectDataLogin();
      }
    },
      error => {
        this.ViewModalIncorrectDataLogin();
    });
  }

}
