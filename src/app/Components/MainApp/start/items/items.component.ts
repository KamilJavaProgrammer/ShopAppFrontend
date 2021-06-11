import {AfterViewInit, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {Product, ProductServiceService} from '../../../../Services/product-service.service';
import {OrderService, ProductBasket} from '../../../../Services/order.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Test2Pipe} from '../../../../Pipes/test2.pipe';
import {HomeComponent} from '../home/home.component';
import {CustomUrlSerializer} from '../../../../Services/interceptor.service';
import { CollapseComponent } from 'angular-bootstrap-md';




@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})



export class ItemsComponent implements OnInit , OnDestroy, AfterViewInit{

  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];


  @ViewChild('alert') alert: TemplateRef<any>;
  @ViewChild('addProductBasket') addProductToBasket: TemplateRef<any>;
  sub: any;
  id: string;
  products: Array<Product> = [];
  productBasket: ProductBasket;
  productPrices = [];
  path = 'http://localhost:8088/image';
  categories: Map<Map<string, number>, Map<string, number>> = new Map<Map<string, number>, Map<string, number>>();
  keys: Array<string> = [];
  values = [];
  page = 0;
  totalRecords: number;
  checked = false;
  product: Product;
  countAllProducts: number;
  productsCount = 0;


  modalRef: BsModalRef;
  sorting: any;
  maxValue: any;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  mapLength = 0;

  filterManufacturersList: Array<string> = [];
  filterStatesList: Array<string> = [];
  valueReady = [];
  searchPhrase = '';



  constructor(private router: Router, private productService: ProductServiceService,
              private route: ActivatedRoute,
              private ngxService: NgxUiLoaderService,
              private modalService: BsModalService,
              private orderService: OrderService,
              private new1: HomeComponent,
            ){


    document.getElementById('articleRouter').style.display = 'none';
    this.productService.GetAllCategories().subscribe(value => {

      this.categories = value;

      this.keys   = Array.from(Object.keys(value));
      Object.values(value).map(value1 => {
        this.values.push(JSON.stringify(value1));
      });

      this.values.forEach((value2, index) => {
        const array  = value2.split(',');
        this.valueReady.push(array);
      });

      this.mapLength = this.categories.size;


    });

  }

  ngAfterViewInit(): void {
    // Promise.resolve().then(() => {
    //   this.collapses.forEach((collapse: CollapseComponent) => {
    //     collapse.toggle();
    //   });
    // });
    }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(params => {
      this.ngxService.start();
      this.id = params.name;
      this.sorting = 'Sortuj wg';
      this.GetImages(this.page, this.id, 0, 100000);
    });
  }


  ngOnDestroy(): void {
    document.getElementById('articleRouter').style.display = 'block';
    this.sub.unsubscribe();
  }


  GetImages(id: number, name: string, minPrice: number, maxPrice: number): void{
    this.products = [];
    this.productPrices = [];
    this.productsCount = 0;

    this.productService.GetProductsCurrentItem(id, name, minPrice, maxPrice).subscribe(productsArray => {
      this.productsCount = productsArray.length;
      productsArray.forEach(product => {
        this.productService.getImageFromService(product).subscribe(blob => {
          this.createImageFromBlob(blob, product);
        });
        this.productPrices.push(+product.productPrice);
      });

      this.AssignNamesToTables(productsArray);
      this.ngxService.stop();

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
    this.new1.basketSum = this.new1.basketSum + +product.productPrice;
    this.new1.productAmount++;
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


  Search(): void {
    this.router.navigate(['/sklep', {outlets: {route4: ['produkty', this.searchPhrase]}}]);
    this.CountProducts();
  }

  ReadValues(lowValue: number, highValue: number): void{

    this.products = [];
    this.productPrices = [];

    this.productService.GetProductsCurrentItem(this.page, this.id, lowValue, highValue).subscribe(value => {

      value.forEach(product => {

        this.productPrices.push(+product.productPrice);
        this.productService.getImageFromService(product).subscribe(blob => {
          this.createImageFromBlob(blob, product);
        });

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

  AssignNamesToTables(products: Array<Product>): void{
    products.forEach(value => {
      if (value.manufacturer !== null){
        if (!this.filterManufacturersList.some(value1 => value1 === value.manufacturer)){
          this.filterManufacturersList.push(value.manufacturer);
        }
      }


      if (value.state !== null){
        if (!this.filterStatesList.some(value1 => value1 === value.state)){
          this.filterStatesList.push(value.state);
        }
      }
    });
  }


  GetGivenProducts(d: any): void {
    const b = Test2Pipe.transform(d);
    this.router.navigate(['/sklep', {outlets: {route4: ['produkty', b]}}]);
    document.getElementById('productStart').scrollIntoView({behavior: 'smooth'});


  }
}
