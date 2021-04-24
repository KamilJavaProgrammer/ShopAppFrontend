import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Product, ProductServiceService} from '../../product-service.service';
import {ProductBasket, OrderService} from '../../order.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataserviceService} from '../../dataservice.service';
import {Options} from '@angular-slider/ngx-slider';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {HomeShopComponent} from '../home-shop/home-shop.component';

@Component({
  selector: 'app-details-current-coffe-machine',
  templateUrl: './Current-Item.html',
  styleUrls: ['./Current-Item.css']
})
export class DetailsCurrentCoffeMachineComponent implements OnInit, OnDestroy{




  @ViewChild('alert') alert: TemplateRef<any>;

  @ViewChild('addProductBasket') addProductToBasket: TemplateRef<any>;
  sub: any;
  id: string;
  idTable: Array<string> = [];
  products: Array<Product> = [];
  productBasket: ProductBasket;
  productPrices = [];
  path = 'http://localhost:8088/image';
  formData: any;
  categories: Map<string, number>;
  modalInput: any;
  page = 1;
  totalRecords: number;
  checked = false;
  product: Product;

  options: Options = {
    floor: 0,
    ceil: 5000,
  };

  modalRef: BsModalRef;
  value12 = 1000;
  highValue12 = 2000;
  sorting: any;
  maxValue: any;


  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };


  constructor(private router: Router, private productService: ProductServiceService,
              private dataService: DataserviceService, private route: ActivatedRoute,
              private ngxService: NgxUiLoaderService,
              private modalService: BsModalService,
              private orderService: OrderService,
              private homeShopComponent: HomeShopComponent){
  }

  ngOnInit(): void {

  document.getElementById('article').style.display = 'none';


  this.sub = this.route.params.subscribe(params => {

      this.ngxService.start();
      setTimeout(() => {
        this.ngxService.stop();
      }, 100);

      this.id = params.id;
      this.idTable = this.id.split('/');
      this.formData = new FormData();
      this.formData.append('path', this.id);
      this.sorting = 'Sortuj wg';

      this.productService.GetCategories(this.formData).subscribe(value => {
        this.categories = value;
      });
      this.GetImages(this.formData);

    });
  }

  ngOnDestroy(): void {

    document.getElementById('article').style.display = 'block';
    this.sub.unsubscribe();
  }


  GetImages(formData: FormData): void{
    this.products = [];
    this.productPrices = [];

    this.productService.GetProducts(formData).subscribe(productsArray => {

      productsArray.forEach(product => {
        this.productService.getImageFromService(product).subscribe(blob => {
          this.createImageFromBlob(blob, product);
        });
        this.productPrices.push(+product.productPrice);
      });

      const prices: Array<number> = this.productPrices.sort((a, b) => this.compare(a, b));

      this.options = ({
        floor: prices[0],
        ceil: prices[prices.length - 1],
      });

      this.value12 = prices[0];
      this.highValue12 =  prices[prices.length - 1];
    });
  }




  createImageFromBlob(image: Blob, product: Product): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {

      product.imageByte = reader.result;
      this.products.push(product);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }



   compare(a, b): number {
    if ( a < b) {
      return -1;
    }
    if ( a > b) {
      return 1;
    }
    return 0;
  }


  RedirectToTechnicalDataComponent(id: number): void {
    this.router.navigate(['/shop', {outlets: {route4: ['technicalData', id]}}]);
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
      this.productBasket = ({
        image: product.imageByte,
        nameOfProduct: product.productName,
        bruttoPrice: +product.productPrice,
        numberOfItems: 1
      });
      this.orderService.AddOrder(this.productBasket);
      this.modalService.show(this.addProductToBasket, {class: 'modal-md'});


    }


    OpenModal(template: TemplateRef<any>): void{

    this.modalRef = this.modalService.show(template, {class: 'modal-lg'});
  }


  Search(event: any): void {
    const spanItems = document.querySelectorAll('.categoryList');
    const searchItem = event.target.value.toLowerCase();

    spanItems.forEach(value => {
      if (value.textContent.toLowerCase().indexOf(searchItem) !== -1){

        value.closest<HTMLElement>('.categoryList').style.display = 'block';

      }
      else{
        value.closest<HTMLElement>('.categoryList').style.display = 'none';
      }

    });

  }

  ReadValues(): void{
    this.products = [];
    this.productPrices = [];

    this.productService.GetProducts(this.formData).subscribe(value => {

      value.forEach(product => {

        if (+product.productPrice >= this.value12  && +product.productPrice <= this.highValue12 )
        {

          this.productPrices.push(+product.productPrice);
          this.productService.getImageFromService(product).subscribe(blob => {
            this.createImageFromBlob(blob, product);
          });
        }
      });
    });
  }



  comparePrice(a: Product, b: Product): number {
    if ( +a.productPrice < +b.productPrice) {
      return -1;
    }
    if ( +a.productPrice > +b.productPrice) {
      return 1;
    }
    return 0;
  }


  compareName(a: Product, b: Product): number {
    if ( a.productName < b.productName) {
      return -1;
    }
    if ( a.productName > b.productName) {
      return 1;
    }
    return 0;
  }


  Sort(): void {

    switch (this.sorting) {

      case 'Cena rosnąco':
      {
         this.products.sort((a, b) => this.comparePrice(a, b));
         break;
      }
      case 'Cena malejąco':
      {
        this.products.sort((a, b) => this.comparePrice(a, b));
        this.products.reverse();
        break;
      }

      case 'Alfabetycznie':
      {
       this.products.sort((a, b) => this.compareName(a, b));
       break;
      }
      default:
      {
        this.products.sort();
      }

    }

  }

  CloseAlertModal(): void {
    this.modalService.hide();
  }
}


