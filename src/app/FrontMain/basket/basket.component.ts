import {Component, OnDestroy, OnInit} from '@angular/core';
import { ProductServiceService} from '../../product-service.service';
import {ProductBasket, OrderService} from '../../order.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {HomeShopComponent} from '../home-shop/home-shop.component';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.css']
})
export class BasketComponent implements OnInit, OnDestroy {

  sumMoney = 0;
  orders: Array<ProductBasket> = [];
  parcelPrice = 18;


  constructor( private productServiceService: ProductServiceService,
               private orderService: OrderService,
               private ngxService: NgxUiLoaderService,
               private homeShopComponent: HomeShopComponent) {}



  ngOnInit(): void {

    this.ngxService.startLoader('1');

    this.setFront();

    if (this.orderService.table.length < 1)
    {
      if (JSON.parse(sessionStorage.getItem('tableOrders')) !== null) {
        this.orderService.table = JSON.parse(sessionStorage.getItem('tableOrders'));
      }
    }
    this.orders = this.orderService.table;


    this.sumMoney = 0;
    this.orders.forEach(value => {
        this.sumMoney = this.sumMoney + (value.bruttoPrice * value.numberOfItems);
    });
    this.ngxService.stopLoader('1');


  }

  ngOnDestroy(): void {
   document.getElementById('article').style.display = 'block';
  }



  setFront(): void {
    document.getElementById('article').style.display = 'none';
    document.getElementById('anchor').scrollIntoView({behavior: 'smooth'});
  }


  Count(order: ProductBasket): void {

    this.productServiceService.GetOneProduct(order.idProduct).subscribe(product => {
      this.homeShopComponent.productAmount = 0;
      this.homeShopComponent.basketSum = 0;
      this.sumMoney = 0;


      for (const order1 of this.orders)
      {

        if (order1.idProduct === order.idProduct)
        {

          if (order.numberOfItems > +product.numberOfItems)
          {
            alert('Maksymalna liczba dostępnych przedmiotów to  ' + product.numberOfItems);
            order1.numberOfItems = +product.numberOfItems;
          }

          else if (order.numberOfItems < 1)
          {
            alert('Niepoprawna ilość');
            order1.numberOfItems = 1;

          }
          else if (isNaN(order.numberOfItems) === true)
          {
            alert('Niepoprawna dane');
            order1.numberOfItems = 1;

          }
          else
          {

          }

        }

        this.homeShopComponent.productAmount += +order1.numberOfItems;
        this.homeShopComponent.basketSum += +order1.bruttoPrice * order1.numberOfItems;
      }

      this.sumMoney = this.homeShopComponent.basketSum;
      sessionStorage.setItem('tableOrders', JSON.stringify(this.orders));
    });
  }


  toSupply(): void{
    document.getElementById('anchor').scrollIntoView({behavior: 'smooth'});
    document.getElementById('selectOption').style.display = 'block';
    document.getElementById('OrderForm').style.display = 'none';
  }


  DeleteProduct(id: number): void {

    for (let i = 0; i < this.orders.length; i++)
    {
      if (this.orders[i].idProduct === id)
      {
        this.homeShopComponent.basketSum -= this.orders[i].numberOfItems * this.orders[i].bruttoPrice;
        this.homeShopComponent.productAmount -= this.orders[i].numberOfItems;
        this.orders.splice(i,  1);
        sessionStorage.setItem('tableOrders', JSON.stringify(this.orders));
      }
    }
  }

}
