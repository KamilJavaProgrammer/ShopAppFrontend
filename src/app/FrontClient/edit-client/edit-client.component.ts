import { Component, OnInit } from '@angular/core';
import {Client, Product, ProductServiceService} from '../../product-service.service';
import {DataserviceService} from '../../dataservice.service';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {

  client: Client;

  id: number;
  nip: string;
  buyer: string;
  recipient: string;
  account: string;
  address: string;
  phoneNumber: string;

  constructor(public dataserviceService: DataserviceService, private productservice: ProductServiceService) { }

  ngOnInit(): void {
    // this.dataserviceService.dataClient.subscribe(p => {this.id = p.id;
    //                                                    this.nip = p.nip;
    //                                                    this.buyer = p.buyer;
    //                                                    this.recipient = p.recipient;
    //                                                    this.account = p.account;
    //                                                    this.address = p.address;
    //                                                    this.phoneNumber = p.phoneNumber; });

}




Clear(): void{
    this.id = null;
    this.nip = '';
    this.buyer = '';
    this.recipient = '';
    this.account = '';
    this.address = '';
    this.phoneNumber = '';
  }

PatchProduct() {

    this.client = ({
      // buyer : this.buyer,
      // nip : this.nip,
      // address : this.address,
      // account: this.account,
     // recipient : this.recipient,
      phoneNumber: this.phoneNumber,

    });

    this.productservice.PatchClient(this.id, this.client).subscribe(p => {this.Clear(); });

  }
}

