import { Component, OnInit } from '@angular/core';
import {ClientServiceService, ShopClient} from '../../../../../../Services/client-service.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.css']
})
export class ClientEditComponent implements OnInit {
  titlename: 'Edycja klienta';
  shopClient: ShopClient = ({
    address: ({})

  });
  sub: any;
  id: any;
  constructor(private clientService: ClientServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.clientService.GetOneClientById(this.id).subscribe(value => {
        this.shopClient = value;
      });
    });
  }
  EditShopClient(event: ShopClient): void{
    this.clientService.EditShopClient(event, this.id).subscribe(value => {
      alert('udalo sie wyedytować');
    });
  }
}
