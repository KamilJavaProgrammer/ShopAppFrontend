import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UserService} from '../../../../Services/user.service';
import {AuthService} from '../../../../Services/auth.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  user: User = ({});

  constructor(private authService: AuthService, private ngxService: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    document.getElementById('articleRouter').style.display = 'none';
    window.scrollTo(0, 0);
  }

  ngOnDestroy(): void {
    document.getElementById('articleRouter').style.display = 'block';
  }

  ChangePassword(): void {

    this.ngxService.startLoader('3');
    setTimeout(() => {
      this.ngxService.stopLoader('3');
    }, 300);
    this.authService.SendUserEmail(this.user.email).subscribe(response => {
      if (response === true) {
        this.authService.CodeVerificationHandle(this.user, () => this.Clear());
      }
    });


  }


  Clear(): void {
    this.user = ({
      email: '',
      password: '',
      changedPassword: ''
    });
  }
}
