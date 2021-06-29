import {Component, OnDestroy, OnInit} from '@angular/core';
import {User} from '../../../../Services/user.service';
import {Router} from '@angular/router';
import {BsModalService} from 'ngx-bootstrap/modal';
import {AuthService} from '../../../../Services/auth.service';


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

  constructor(private modalService: BsModalService, private authService: AuthService,
              private router: Router) {}

  ngOnInit(): void {

    this.setFront();
    window.scrollTo(0, 0);

  }
  ngOnDestroy(): void {
    document.getElementById('articleRouter').style.display = 'block';
  }

  setFront(): void {

    document.getElementById('articleRouter').style.display = 'none';
  }


  public RegisterUser(): void{
    this.user = ({
      username: this.username,
      password: this.password,
      email : this.email

    });

    this.authService.RegistrationUser(this.user).subscribe(value => {

      if (value === true){
        alert('Rejestracja powiodła się. Teraz Zaloguj się');
        this.Clear();
        this.router.navigate(['/sklep', {outlets: {route4: ['logowanie']}}]);

      }
      else
      {
        alert('Login lub E-mail juz istnieje.');
        this.Clear();
      }
    }, error => {
      console.log(error);
      alert('Rejestracja nie powiodła się');
      this.Clear();

    });
  }

  // public RegisterUser(): void{
  //   this.user = ({
  //     username: this.username,
  //     password: this.password,
  //     email : this.email
  //
  //   });
  //
  //   this.authService.RegistrationUser(this.user).subscribe(value => {
  //
  //   if (value === true){
  //
  //     this.result = prompt('Podaj kod weryfikacyjny wysłany na adres e-mail');
  //
  //     if (this.result != null) {
  //       this.user = ({
  //         username: this.username,
  //         password: this.password,
  //         email: this.email,
  //         codeVerification: this.result
  //       });
  //
  //       this.authService.SendVerificationCode(this.user).subscribe(response => {
  //         if (response === true) {
  //           alert('Udało się! Zaloguj się!');
  //           this.router.navigate(['/sklep', {outlets: {route4: ['logowanie']}}]);
  //         }
  //         else {
  //
  //           alert('Nie Udało się! Spróbuj ponownie!');
  //           this.RepeatSendCode();
  //           this.Clear();
  //         }
  //       });
  //     }
  //     else {
  //       alert('Wpisz kod!');
  //     }
  //   }
  //   else
  //   {
  //     alert('Login lub E-mail juz istnieje.');
  //     this.Clear();
  //   }
  //   }, error => {
  //     console.log(error);
  //     alert('Rejestracja nie powiodła się');
  //     this.Clear();
  //
  //   });
  // }


  public RepeatSendCode(): void {

    this.result = prompt('Podaj kod weryfikacyjny wysłany na adres e-mail');
    this.user = ({
          username: this.username,
          password: this.password,
          email: this.email,
          codeVerification: this.result
        });

    this.authService.SendVerificationCode(this.user).subscribe(response => {

          if (response === true) {
            alert('Udało się! Zaloguj się!');
            this.router.navigate(['/sklep', {outlets: {route4: ['logowanie']}}]);
          }

          else {
            alert('Nie Udało się! Spróbuj ponownie!');
            this.router.navigate(['/sklep', {outlets: {route4: ['rejestracja']}}]);
            }
        });
  }

Clear(): void{
  this.username = '';
  this.password = '';
  this.email = '';

}


}
