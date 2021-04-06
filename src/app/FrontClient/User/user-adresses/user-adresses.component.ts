import {Component, Input, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Client} from '../../../product-service.service';
import {Form} from '@angular/forms';
import {UserService} from '../../../user.service';

@Component({
  selector: 'app-user-adresses',
  templateUrl: './user-adresses.component.html',
  styleUrls: ['./user-adresses.component.css']
})
export class UserAdressesComponent implements OnInit, OnDestroy {

  name: string;
  surname: string;
  email: string;
  businessName: string;
  placeOfResident: string;
  postCode: string;
  town: string;
  phoneNumber: string;
  NIP: string;
  regon: string;
  businessPhoneNumber: string;
  businessTown: string;
  businessPostCode: string;
  businessPlaceOfResident: string;
  businessEmail: string;
  client: Client;

  @ViewChild('settlementAdrresssTemplate')
  settlementAdrresssForm: TemplateRef<any>;

  @ViewChild('shipmentAdrressTemplate')
  shipmentAdrressForm: TemplateRef<any>;

  template: TemplateRef<any>;


  constructor(private ngxService: NgxUiLoaderService, private userService: UserService) { }

  ngOnInit(): void {
    this.ngxService.startLoader('2');
    setTimeout(() => {
      this.ngxService.stopLoader('2');
    }, 500);

    document.getElementById('addresses').style.color = 'crimson';

    this.userService.GetClient().subscribe(value => {
      this.client = value;
      this.AssignDataToFormField();
    },
      error => {
      console.log(error);
      });
  }


  AssignDataToFormField(): void{

    this.name = this.client.name;
    this.surname = this.client.surname;
    this.email = this.client.email;
    this.phoneNumber = this.client.phoneNumber;
    this.placeOfResident = this.client.address.placeOfresident;
    this.town = this.client.address.town;
    this.postCode = this.client.address.postCode;


    this.businessPhoneNumber = this.client.business.phoneNumber;
    this.businessName = this.client.business.name;
    this.businessEmail = this.client.business.email;
    this.NIP = this.client.business.nip;
    this.regon = this.client.business.regon;
    this.businessPlaceOfResident = this.client.business.address.placeOfresident;
    this.businessTown = this.client.business.address.town;
    this.businessPostCode = this.client.business.address.postCode;

  }



  ngOnDestroy(): void {
    document.getElementById('addresses').style.color = 'black';

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

    const promise = new Promise(resolve => {
      this.client = ({
          id: this.client.id,
          name: this.name,
          surname: this.surname,
          phoneNumber: this.phoneNumber,
          email: this.email,
          address: ({
            id: this.client.address.id,
            placeOfresident: this.placeOfResident,
            town: this.town,
            postCode: this.postCode,
            type: 'Wysyłkowy',
          }),
          business: ({
            id: this.client.business.id,
            regon: this.regon,
            email: this.businessEmail,
            name: this.businessName,
            nip: this.NIP,
            phoneNumber: this.businessPhoneNumber,
            account: this.client.business.account,
            address: ({
               id: this.client.business.address.id,
               placeOfresident: this.businessPlaceOfResident,
               town: this.businessTown,
               postCode: this.businessPostCode,
               type: 'Rozliczeniowy',
            })
          }),
        });
      resolve(this.client);
    });

    promise.then(value => {
       this.userService.ChangeClientData(value).subscribe();
    });

    document.getElementById('adressSquares').style.display = 'block';
    document.getElementById('addressForm').style.display = 'none';
  }
}
