import {Component, OnDestroy, OnInit} from '@angular/core';
import {CompleteOrder, OrderService, ProductBasket} from '../../../../Services/order.service';
import {ProductServiceService} from '../../../../Services/product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {HomeComponent} from '../../start/home/home.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-basket-shop',
  templateUrl: './basket-shop.component.html',
  styleUrls: ['./basket-shop.component.css']
})
export class BasketShopComponent implements OnInit, OnDestroy {


  sumMoney = 0;
  orders: Array<ProductBasket> = [];
  parcelPrice = 18;


  constructor( private productServiceService: ProductServiceService,
               private orderService: OrderService,
               private ngxService: NgxUiLoaderService,
               private new3: HomeComponent,
               private router: Router) {}



  ngOnInit(): void {

    // this.ngxService.startLoader('1');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // document.getElementById('mainAnchor').scrollIntoView({behavior: 'smooth'});
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
    // this.ngxService.stopLoader('1');


  }

  ngOnDestroy(): void {
    document.getElementById('articleRouter').style.display = 'block';
  }



  setFront(): void {
    document.getElementById('articleRouter').style.display = 'none';
    // document.getElementById('anchor').scrollIntoView({behavior: 'smooth'});
  }


  Count(order: ProductBasket): void {

    this.productServiceService.GetOneProduct(order.idProduct).subscribe(product => {
      this.new3.productAmount = 0;
      this.new3.basketSum = 0;
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

        this.new3.productAmount += +order1.numberOfItems;
        this.new3.basketSum += +order1.bruttoPrice * order1.numberOfItems;
      }

      this.sumMoney = this.new3.basketSum;
      sessionStorage.setItem('tableOrders', JSON.stringify(this.orders));
    });
  }


  toSupply(): void{
    // document.getElementById('anchor').scrollIntoView({behavior: 'smooth'});
    // document.getElementById('selectOption').style.display = 'block';
    // document.getElementById('OrderForm').style.display = 'none';
  }


  DeleteProduct(id: number): void {

    for (let i = 0; i < this.orders.length; i++)
    {
      if (this.orders[i].idProduct === id)
      {
        this.new3.basketSum -= this.orders[i].numberOfItems * this.orders[i].bruttoPrice;
        this.new3.productAmount -= this.orders[i].numberOfItems;
        this.orders.splice(i,  1);
        sessionStorage.setItem('tableOrders', JSON.stringify(this.orders));
      }
    }
  }

  SubtractOneProduct(productBasket: ProductBasket, currentIteration: number): void {
    this.orders[currentIteration].numberOfItems--;

    if (this.orders[currentIteration].numberOfItems-- === 0)
    {
      this.DeleteProduct(productBasket.idProduct);
    }

  }

  AddOneProduct(productBasket: ProductBasket, currentIteration: number): void {
    this.orders[currentIteration].numberOfItems++;
    this.Count(productBasket);

  }

  RedirectToHomeComponent(): void {
    this.router.navigate(['/sklep']);
    document.getElementById('mainAnchor').scrollIntoView({behavior: 'smooth'});

  }

  ShowDeliveryDiv(): void {
    document.getElementById('delivery-payment').style.display = 'block';
    document.getElementById('delivery-payment').scrollIntoView({behavior: 'smooth', block: 'end'});
  }
}
