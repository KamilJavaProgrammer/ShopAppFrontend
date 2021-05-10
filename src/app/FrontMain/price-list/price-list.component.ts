import {Component, ElementRef, OnDestroy, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {CompleteOrder, OrderService} from '../../order.service';
import {ClientServiceService, ShopClient} from '../../client-service.service';
import {Product, ProductServiceService} from '../../product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxCaptureService} from 'ngx-capture';
import {BsModalService} from 'ngx-bootstrap/modal';
import {PriceListService, ServicePriceList} from '../../price-list.service';

@Component({
  selector: 'app-price-list',
  templateUrl: './price-list.component.html',
  styleUrls: ['./price-list.component.css']
})
export class PriceListComponent implements OnInit, OnDestroy {

  arrayPriceList: Array<ServicePriceList> = [];
  categories: Array<string> = [];

  constructor(private productService: ProductServiceService, private ngxService: NgxUiLoaderService,
              private ngxCaptureService: NgxCaptureService, private bsModalService: BsModalService,
              private clientService: ClientServiceService, private priceListService: PriceListService) {
  }

  ngOnInit(): void {
    document.getElementById('article').style.display = 'none';

    this.ngxService.startLoader('1');
    this.GetAllPriceList();


  }
  ngOnDestroy(): void {
    document.getElementById('article').style.display = 'block';
  }




  public GetAllPriceList(): void{
     this.priceListService.GetAllPriceList().subscribe(value => {

       this.arrayPriceList = value;
       value.forEach(objectServicePrice => {
         this.Check(objectServicePrice, result => {
           if (result === false){
             this.categories.push(objectServicePrice.category);
           }
         });
       });
       this.ngxService.stopLoader('1');

     });
  }

  Check(objectServicePrice: ServicePriceList, callback): any{
     callback(this.categories.some(value => value.toLowerCase() === objectServicePrice.category.toLowerCase()));
  }


}
