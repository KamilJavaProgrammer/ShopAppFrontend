import {Component, OnDestroy, OnInit} from '@angular/core';
import {User, UserService} from '../../user.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit, OnDestroy {

  password: string;
  email: string;
  confirmPassword: string;
  user: User;

  constructor() { }

  ngOnInit(): void {
    document.getElementById('navbar123').style.display = 'none';
    document.getElementById('article').style.display = 'none';
  }

  ngOnDestroy(): void {
    document.getElementById('article').style.display = 'block';
  }
  ChangePassword(): void {

  }
}

