import {Component, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {User, UserService} from '../../user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {DataserviceService} from '../../dataservice.service';
import {ProductServiceService} from '../../product-service.service';
import {HomeShopComponent} from '../home-shop/home-shop.component';

@Component({
  selector: 'app-registration-user',
  templateUrl: './registration-user.component.html',
  styleUrls: ['./registration-user.component.css'],

})
export class RegistrationUserComponent implements OnInit, OnDestroy{

  user: User;
  email: string;
  password: string;
  username: string;
  result: string;

  constructor(private modalService: BsModalService, private userService: UserService,
              private router: Router) {}

  ngOnInit(): void {
    this.setFront();
  }
  ngOnDestroy(): void {
    document.getElementById('article').style.display = 'block';
  }

  setFront(): void {
    document.getElementById('navbar123').style.display = 'none';
    document.getElementById('article').style.display = 'none';
  }

  public RegisterUser(): void{
    this.user = ({
      username: this.username,
      password: this.password,
      email : this.email

    });

    this.userService.RegistrationUser(this.user).subscribe(value => {

    if (value === 'OK'){

      this.result = prompt('Write your verification code');

      if (this.result != null) {
        this.user = ({
          username: this.username,
          password: this.password,
          email: this.email,
          codeVerification: this.result
        });

        this.userService.SendVerificationCode(this.user).subscribe(response => {
          if (response === 'OK') {
            alert('Udało się! Zaloguj się!');
            this.router.navigate(['/shop', {outlets: {route4: ['logowanie']}}]);
          }
          else {

            alert('Nie Udało się! Spróbuj ponownie!');
            this.RepeatSendCode();
            this.Clear();
          }
        });
      }
      else {
        alert('Code is null!');
      }
    }
    else if (value === 'LoginExists' || value === 'EmailExists')
    {
      alert('Login or Email already Exists.Try Again');
      this.Clear();
    }
    });
  }


  public RepeatSendCode(): void {

    this.result = prompt('Wpisz Twój kod weryfikacyjny');
    this.user = ({
          username: this.username,
          password: this.password,
          email: this.email,
          codeVerification: this.result
        });

    this.userService.SendVerificationCode(this.user).subscribe(response => {

          if (response === 'OK') {
            alert('Udało się! Zaloguj się!');
            this.router.navigate(['/shop', {outlets: {route4: ['logowanie']}}]);
          }

          else {
            alert('Nie Udało się! Spróbuj ponownie!');
            this.router.navigate(['/shop', {outlets: {route4: ['rejestracja']}}]);
            }
        });
  }

Clear(): void{
  this.username = '';
  this.password = '';
  this.email = '';

}


}
