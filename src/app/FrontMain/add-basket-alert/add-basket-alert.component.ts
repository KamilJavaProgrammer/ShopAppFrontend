import {Component, Input, OnInit} from '@angular/core';
import {Product} from '../../product-service.service';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Router} from '@angular/router';

@Component({
  selector: 'app-add-basket-alert',
  templateUrl: './add-basket-alert.component.html',
  styleUrls: ['./add-basket-alert.component.css']
})
export class AddBasketAlertComponent implements OnInit {


  @Input()
  product: Product;

  constructor(private modalService: BsModalService, private router: Router) { }

  ngOnInit(): void {
  }

  CloseAlertModal(): void {
    this.modalService.hide();
  }

  GoToBasket(): void {
    this.CloseAlertModal();
    this.router.navigate(['/shop', { outlets: {'route4': ['koszyk'] }}]);
  }
}
