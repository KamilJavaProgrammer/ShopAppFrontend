import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';

import {User, UserService} from '../../../Services/user.service';

@Component({
  selector: 'app-user-adresses',
  templateUrl: './user-adresses.component.html',
  styleUrls: ['./user-adresses.component.css']
})
export class UserAdressesComponent implements OnInit, OnDestroy {

  name: string;
  email: string;
  phoneNumber: string;
  user: User = ({
    shopClient: ({
      name: '',
      phoneNumber: '',
      surname: '',
      state: '',
      email: '',
      address: ({
        postCode: '',
        town: '',
        placeOfresident: '',
        type: ''
      }),
      business: ({
        email: '',
        phoneNumber : '',
        account: '',
        nip: '',
        regon: '',
        name: '',
        address: ({
          postCode: '',
          town: '',
          placeOfresident: '',
          type: ''
        })
      })
    })
  });

  @ViewChild('settlementAdrresssTemplate') settlementAdrresssForm: TemplateRef<any>;
  @ViewChild('shipmentAdrressTemplate') shipmentAdrressForm: TemplateRef<any>;
  template: TemplateRef<any>;


  constructor(private ngxService: NgxUiLoaderService,
              private userService: UserService) {

    document.getElementById('userAdresses').style.color = 'crimson';
    document.getElementById('userDashboardCard').style.display = 'none';

  }

  ngOnInit(): void {
    this.ngxService.startLoader('2');
    setTimeout(() => {
      this.ngxService.stopLoader('2');
    }, 500);

    this.userService.GetUserFromServerWithJwt().subscribe(value => {
      this.user = value;
    },
      error => {
      console.log(error);
      });

    // document.getElementById('addresses1').style.color = 'crimson';
  }

  ngOnDestroy(): void {
    document.getElementById('userAdresses').style.color = 'black';
    document.getElementById('userDashboardCard').style.display = 'block';

  }

  EditAdrress(addressName: string): void{
    document.getElementById('adressSquares').style.display = 'none';
    document.getElementById('addressForm').style.display = 'block';

    if (addressName === 'Wysyłkowy'){
       this.template = this.shipmentAdrressForm;
    }
    else {
     this.template = this.settlementAdrresssForm;
    }
  }

  SaveData(): void {

    this.userService.ChangeShopClientAddress(this.user.shopClient).subscribe(value => {
      this.user.shopClient = value;
    });
    document.getElementById('adressSquares').style.display = 'block';
    document.getElementById('addressForm').style.display = 'none';
  }
}
