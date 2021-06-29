import {Component, OnInit} from '@angular/core';
import {ClientServiceService, ShopClient} from '../../../../../../Services/client-service.service';
import {Role} from '../../../../../../Enums/role.enum';

@Component({
  selector: 'app-shop-client-add',
  templateUrl: './shop-client-add.component.html',
  styleUrls: ['./shop-client-add.component.css']
})
export class ShopClientADDComponent implements OnInit {

  titlename = 'Dodawanie nowego klienta';
  shopClient: ShopClient = ({
    address: ({})
  });

  constructor(private clientService: ClientServiceService) { }

  ngOnInit(): void {
  }

  SaveClientInDatabase(event: ShopClient): void {
    this.clientService.AddClient(event, Role.ADMIN).subscribe();
  }
}
