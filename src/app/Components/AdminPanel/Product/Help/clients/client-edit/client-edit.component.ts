import { Component, OnInit } from '@angular/core';
import {ClientServiceService, ShopClient} from '../../../../../../Services/client-service.service';
import {ActivatedRoute} from '@angular/router';
import {Role} from '../../../../../../Enums/role.enum';

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
      this.clientService.GetOneClientById(this.id, Role.ADMIN).subscribe(value => {
        this.shopClient = value;
      });
    });
  }
  EditShopClient(event: ShopClient): void{
    this.clientService.EditShopClient(event, this.id, Role.ADMIN).subscribe(value => {
      alert('udalo sie edytowac');
    });
  }
}
