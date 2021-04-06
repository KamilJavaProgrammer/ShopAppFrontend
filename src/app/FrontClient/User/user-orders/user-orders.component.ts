import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompleteOrder, OrderService} from '../../../order.service';
import {NgxUiLoaderModule, NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit,OnDestroy {

  orders: Array<CompleteOrder> = [];
  page = 1;
  totalRecords: number;

  constructor(private orderService: OrderService, private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {
    this.ngxService.startLoader('2');
    setTimeout(() => {
      this.ngxService.stopLoader('2');
    }, 200);
    document.getElementById('orders').style.color = 'crimson';

    this.orderService.GetAllOrdersByUserId().subscribe(value => {
         this.orders = value;
      });
  }

  GetInvoice(id: number): void{
    this.orderService.GetInvoiceByUserId(id).subscribe(value => {
      const fileURL = URL.createObjectURL(value);
      window.open(fileURL);
    });

  }

  ngOnDestroy(): void {
    document.getElementById('orders').style.color = 'black';

  }


}

