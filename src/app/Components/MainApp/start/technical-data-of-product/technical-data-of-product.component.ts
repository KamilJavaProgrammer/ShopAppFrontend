import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProductBasket, OrderService} from '../../../../Services/order.service';
import {Product, ProductServiceService} from '../../../../Services/product-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HomeComponent} from '../home/home.component';

@Component({
  selector: 'app-technical-data-of-product',
  templateUrl: './technical-data-of-product.component.html',
  styleUrls: ['./technical-data-of-product.component.css']
})
export class TechnicalDataOfProductComponent implements OnInit, OnDestroy {


  @ViewChild('alert') alert: TemplateRef<any>;
  @ViewChild('addProductBasket') addProductToBasket: TemplateRef<any>;

  sub: any;
  id: any;
  model: any;
  productCategory: string;
  productSubCategory: string;
  manufacturer: string;
  productName: any;
  productPrice: number;
  numberOfItems: any;
  description: Array<string>;
  order: ProductBasket;
  maxValue: any;
  product: Product = {} as Product;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };



  constructor(private productService: ProductServiceService,
              private route: ActivatedRoute,
              private ngxService: NgxUiLoaderService,
              private modalService: BsModalService,
              private orderService: OrderService,
              private homeShopComponent: HomeComponent,
              ) {}


  ngOnInit(): void {
       window.scrollTo(0, 0);
       this.ngxService.start();
       document.getElementById('mainAnchor').scrollIntoView({behavior: 'smooth'});

       document.getElementById('articleRouter').style.display = 'none';

       this.sub = this.route.params.subscribe(params => {

      this.id = params.id;
      this.productService.GetOneProduct(this.id).subscribe(value => {
        this.product  = value;
        this.description =  value.description.split('.');
        this.productPrice = +value.productPrice;
        this.numberOfItems = value.numberOfItems;
        this.productService.GetImageByPathFromService(value.pathToFile).subscribe(blob => {
          this.createImageFromBlob(blob);
          // this.ngxService.stopLoader('1');

        });

      });
      this.ngxService.stop();

    });
  }

  ngOnDestroy(): void {
    document.getElementById('articleRouter').style.display = 'block';
    this.sub.unsubscribe();
  }

  createImageFromBlob(image: Blob): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      this.product.imageByte = reader.result;
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }


  AddToBasket(product: Product): void {

    this.orderService.CheckExistsOrder(product, result => {
      if (result === true) {
        this.orderService.GetNumberOfItemsFromOrderCallback(product, result1 =>
        {
          this.productService.GetOneProduct(product.id).subscribe(value => {
            if (+value.numberOfItems > result1)
            {
              this.AddProductToBasketList(product);
            }
            else
            {
              this.maxValue = value.numberOfItems;
              this.modalService.show(this.alert, this.config);
            }

          });

        });

      }
      else {
        this.AddProductToBasketList(product);
      }

    });
  }

  AddProductToBasketList(product: Product): void{
    this.product = product;
    this.homeShopComponent.basketSum = this.homeShopComponent.basketSum + +product.productPrice;
    this.homeShopComponent.productAmount++;
    this.order = ({
      image: product.imageByte,
      nameOfProduct: product.productName,
      bruttoPrice: +product.productPrice,
      numberOfItems: 1
    });
    this.orderService.AddOrder(this.order);
    this.modalService.show(this.addProductToBasket, {class: 'modal-md'});

  }


}
