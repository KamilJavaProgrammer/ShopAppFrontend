import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {DataserviceService} from '../../dataservice.service';
import {ProductBasket, OrderService} from '../../order.service';
import {Product, ProductServiceService} from '../../product-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {SearchingServiceService} from '../../searching-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HomeShopComponent} from '../home-shop/home-shop.component';

@Component({
  selector: 'app-technical-data-of-product',
  templateUrl: './technical-data-of-product.component.html',
  styleUrls: ['./technical-data-of-product.component.css']
})
export class TechnicalDataOfProductComponent implements OnInit, OnDestroy {
  sub: any;
  id: any;
  imageToShow: any;
  state: string;
  model: any;
  productCategory: string;
  productSubCategory: string;
  manufacturer: string;
  productName: any;
  productPrice: number;
  numberOfItems: any;
  description: Array<string>;


  path = 'http://localhost:8088/image';
  table = [];
  order: ProductBasket;

  maxValue: any;


  product: Product = {} as Product;



  @ViewChild('alert')
  alert: TemplateRef<any>;

  @ViewChild('addProductBasket')
  addProductToBasket: TemplateRef<any>;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  sorting: any;
  page = 1;
  totalRecords: number;


  constructor(public dataService: DataserviceService,
              private productService: ProductServiceService,
              private serachingservice: SearchingServiceService,
              private dataserviceService: DataserviceService,
              private route: ActivatedRoute,
              private ngxService: NgxUiLoaderService,
              private modalService: BsModalService,
              private orderService: OrderService,
              private homeShopComponent: HomeShopComponent,
              private router: Router) {}


  ngOnInit(): void {

    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 100);

    document.getElementById('article').style.display = 'none';

    this.sub = this.route.params.subscribe(params => {

      this.id = params.id;
      this.productService.GetOneProduct(this.id).subscribe(value => {
        this.product  = value;
        this.getImageFromService(value);
        this.description =  value.description.split('.');
        this.productPrice = +value.productPrice;
        this.numberOfItems = value.numberOfItems;



      });
    });
  }




  getImageFromService(product: Product): void {
    const pathImage  = product.pathToFile.replace('C:/ZdjęciaBaza/Upload', '');

    this.productService.GetPhotos(this.path + pathImage).subscribe(data => {
      this.createImageFromBlob(data);
    });
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


  ngOnDestroy(): void {
    document.getElementById('article').style.display = 'block';
    this.sub.unsubscribe();

  }

  AddToBasket(product: Product): void {

    this.orderService.CheckExistsOrder(product, result => {

      if (result === true) {

        this.orderService.GetNumberOfItemsFromOrderCallback(product, result1 =>
        {

          this.productService.GetOneProduct(product.id).subscribe(value => {
            if (+value.numberOfItems > result1)
            {
              this.AddBasket1(product);
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
        this.AddBasket1(product);
      }

    });
  }

  AddBasket1(product: Product): void{
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
