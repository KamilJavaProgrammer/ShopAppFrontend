import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User, UserService} from '../../../../Services/user.service';
import {ProductServiceService} from '../../../../Services/product-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../../../Services/auth.service';
import {HomeComponent} from '../../start/home/home.component';
import {NgxUiLoaderService} from 'ngx-ui-loader';



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
  result: string;

  text: string;

  @ViewChild('alert')
  alert: TemplateRef<any>;

  constructor(private modalService: BsModalService,
              private userService: UserService,
              private productServiceService: ProductServiceService,
              private router: Router, private route: ActivatedRoute,
              private homeComponent: HomeComponent,
              private authService: AuthService,
              private ngxService: NgxUiLoaderService,
  ) {

  }

  ngOnInit(): void {
    this.setFront();

  }

  ngOnDestroy(): void {

    document.getElementById('articleRouter').style.display = 'block';
  }


  CloseAlertModal(): void {
    this.modalService.hide();
  }


  setFront(): void {
    document.getElementById('articleRouter').style.display = 'none';
  }

  Clear(): void{
    this.username = '';
    this.password = '';
  }

  ViewModalIncorrectDataLogin(): void{
    this.text = 'Niepoprawne dane logowania!';
    this.homeComponent.account = 'Zaloguj się';
    this.modalService.show(this.alert, {class: 'modal-lg'});
    this.Clear();
  }



  Login(): void {
    this.ngxService.start();
    this.user = ({
      password : this.password,
      username : this.username
    });

    this.authService.LoginUser(this.user).subscribe(value => {
      if (value === 200){

        this.router.navigate(['/sklep', {outlets: {route4: 'konto'}}]);
        this.homeComponent.account = 'Twoje konto';
      }

     else if (value === 403){


        this.result = prompt('Podaj kod weryfikacyjny wysłany na adres e-mail');

        if (this.result != null) {
          this.user = ({
            username: this.username,
            password: this.password,
            codeVerification: this.result
          });

          this.authService.SendVerificationCode(this.user).subscribe(response => {
            if (response === true) {
              alert('Udało się! Zaloguj się!');
              this.router.navigate(['/sklep', {outlets: {route4: ['logowanie']}}]);
            }
            else {
              alert('Wpisz kod!');
              this.Clear();
            }
          });
        }
        else {
          alert('Wpisz kod!');
        }

     }
     else
      {
        this.ngxService.stop();
        this.ViewModalIncorrectDataLogin();
      }
    },
      error => {
        this.ngxService.stop();
        console.log(error);
        this.ViewModalIncorrectDataLogin();
    });
  }

}
