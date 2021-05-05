import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UserService} from '../../user.service';
import {AuthService} from '../../auth.service';
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
    document.getElementById('article').style.display = 'none';
  }

  ngOnDestroy(): void {
    document.getElementById('article').style.display = 'block';
  }

  ChangePassword(): void {

    this.ngxService.startLoader('6');
    setTimeout(() => {
      this.ngxService.stopLoader('6');
    }, 2000);
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
