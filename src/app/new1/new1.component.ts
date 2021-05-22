import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Product, ProductServiceService} from '../product-service.service';
import {OrderService, ProductBasket} from '../order.service';
import {Options} from '@angular-slider/ngx-slider';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {HomeShopComponent} from '../FrontMain/home-shop/home-shop.component';

@Component({
  selector: 'app-new1',
  templateUrl: './new1.component.html',
  styleUrls: ['./new1.component.css'],
})
export class New1Component implements OnInit , OnDestroy{




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
  categories: Map<string, number> = new Map<string, number>();
  categories1 = [];
  modalInput: any;
  page = 1;
  totalRecords: number;
  checked = false;
  product: Product;

  productsCount = 0;

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

  positiveinfinity = Number.POSITIVE_INFINITY;
  mapLength = 0;



  constructor(private router: Router, private productService: ProductServiceService,
              private route: ActivatedRoute,
              private ngxService: NgxUiLoaderService,
              private modalService: BsModalService,
              private orderService: OrderService,
              private homeShopComponent: HomeShopComponent){

    this.categories.set('menskie', 43);
    this.categories.set('dama', 34);
    this.mapLength = this.categories.size;

  }

  ngOnInit(): void {

    document.getElementById('articleRouter').style.display = 'none';


    // this.sub = this.route.params.subscribe(params => {

      // this.ngxService.startLoader('1');


      // this.id = params.id;
      // this.idTable = this.id.split('/');
    this.formData = new FormData();
      // this.formData.append('path', this.id);
    this.formData.append('path', 'Kawa');
    this.sorting = 'Sortuj wg';

    this.productService.GetCategories(this.formData).subscribe(value => {
        this.categories = value;
      });
    this.GetImages(this.formData);


    // });
  }

  ngOnDestroy(): void {

    document.getElementById('articleRouter').style.display = 'block';
    this.sub.unsubscribe();
  }


  GetImages(formData: FormData): void{
    this.products = [];
    this.productPrices = [];
    this.productsCount = 0;

    this.productService.GetProducts(formData).subscribe(productsArray => {
         this.productsCount = productsArray.length;
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
         this.ngxService.stopLoader('1');

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

  CountProducts(): void{
    this.productsCount = 0;
    const productContainers: NodeListOf<HTMLElement> = document.querySelectorAll('.productContainer');
    productContainers.forEach(value => {
         if (value.style.display === 'block') {
              this.productsCount++;
         }
     });
  }


  Search(event: any): void {

    const spanItems = document.querySelectorAll('.productContainer');
    const searchItem = event.target.value.toLowerCase();

    spanItems.forEach(value => {
      if (value.textContent.toLowerCase().indexOf(searchItem) !== -1){

        value.closest<HTMLElement>('.productContainer').style.display = 'block';

      }
      else
        {
        value.closest<HTMLElement>('.productContainer').style.display = 'none';
      }

    });
    this.CountProducts();
  }

  ReadValues(lowValue: number, highValue: number): void{

    console.log(lowValue);
    console.log(highValue);
    this.products = [];
    this.productPrices = [];

    this.productService.GetProducts(this.formData).subscribe(value => {

      value.forEach(product => {

        if (+product.productPrice >= lowValue  && +product.productPrice <= highValue )
        {

          this.productPrices.push(+product.productPrice);
          this.productService.getImageFromService(product).subscribe(blob => {
            this.createImageFromBlob(blob, product);
          });
        }
      });
      this.productsCount = this.productPrices.length;
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

  SortingPriceRanges(event: any): void{

    const lowValue: number = event.currentTarget.dataset.low;
    const highvalue: number = event.currentTarget.dataset.high;

    this.ReadValues(lowValue, highvalue);

  }

}
