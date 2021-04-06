import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  adminPassword: string;
  adminLogin: string;

  constructor() { }

  ngOnInit(): void {
    document.getElementById('navbar123').style.display = 'none';

  }

}
