import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Product, ProductServiceService} from '../../../../../product-service.service';
import {ClientServiceService, ShopClient} from '../../../../../client-service.service';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {

  @Input() shopClient: ShopClient;
  @Input() titlename: string;
  @Output() eventEmiter: EventEmitter<any> = new EventEmitter<any>();

  constructor(private clientService: ClientServiceService) {
  }

  ngOnInit(): void {

  }

  Clear(): void {

  }

  SendShopClientToDatabase(): void {
     this.eventEmiter.emit(this.shopClient);
  }
}
