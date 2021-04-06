import { Component, OnInit } from '@angular/core';
import {Client, ProductServiceService} from '../../product-service.service';

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.css']
})
export class AddClientComponent implements OnInit {

  id: number;
  nip: string;
  buyer: string;
  recipient: string;
  account: string;
  address: string;
  phoneNumber: string;
  client: Client;

  constructor(private clientService: ProductServiceService) { }

  ngOnInit(): void {
  }


  Clear(): void{
    this.id = null;
    this.nip = '';
    this.recipient = '';
    this.account = '';
    this.address = '';
    this.phoneNumber = '';
  }


  AddProductToDatabase() {
    this.client = ({

      phoneNumber : this.phoneNumber,
      // recipient : this.recipient,
      // account : this.account,
      // address : this.address,
      // buyer : this.buyer,
      // nip : this.nip


    });
    this.clientService.AddClient(this.client).subscribe(p => {});
    this.Clear();
    alert('Dodałeś do bazy nowego klienta');
  }


}
