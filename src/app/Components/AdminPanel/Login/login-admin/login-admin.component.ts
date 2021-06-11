import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User, UserService} from '../../../../Services/user.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ProductServiceService} from '../../../../Services/product-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '../../../../Services/auth.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.css']
})
export class LoginAdminComponent implements OnInit {
  adminPassword: string;
  adminLogin: string;
  user: User;
  text: string;
  @ViewChild('alert') alert: TemplateRef<any>;

  constructor(private modalService: BsModalService,
              private userService: UserService,
              private productServiceService: ProductServiceService,
              private router: Router, private route: ActivatedRoute,
              private authService: AuthService,
  ) {  }

  ngOnInit(): void {

  }

  CloseAlertModal(): void {
    this.modalService.hide();
  }


  Clear(): void{
    this.adminLogin = '';
    this.adminPassword = '';
  }

  Login(): void {
    this.user = ({
      password : this.adminPassword,
      username : this.adminLogin
    });

    this.authService.loginAdmin(this.user).subscribe(value => {
      if (value === true){

        this.router.navigate(['/admin']);
      }
      else
      {
        this.text = 'Niepoprawne dane logowania!';
        this.modalService.show(this.alert, {class: 'modal-lg'});
        this.Clear();
      }
    }, error => {
      console.log('error');
    });
  }
}
