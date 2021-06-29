import {AfterViewInit, Component, OnDestroy, OnInit, Optional, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {Product, ProductServiceService} from '../../../../Services/product-service.service';
import {OrderService, ProductBasket} from '../../../../Services/order.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {Test2Pipe} from '../../../../Pipes/test2.pipe';
import {HomeComponent} from '../home/home.component';
import { CollapseComponent } from 'angular-bootstrap-md';
import {SortOption} from '../../../../Enums/sort-option.enum';
import {AccountOption} from '../../../../Enums/account-option.enum';
import {AuthService} from '../../../../Services/auth.service';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.css']
})



export class ItemsComponent implements OnInit , OnDestroy, AfterViewInit{


  minPrice = 0;
  maxPrice = 100000;
  id: string;
  page = 1;
  sortEnumIndex = 0;

  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];
  @ViewChild('alert') alert: TemplateRef<any>;
  @ViewChild('addProductBasket') addProductToBasket: TemplateRef<any>;
  sub: any;
  products: Array<Product> = [];
  productBasket: ProductBasket;
  productPrices = [];
  path = AuthService.ADDRESS_SERVER + '/image/';
  categories: Map<Map<string, number>, Map<string, number>> = new Map<Map<string, number>, Map<string, number>>();
  keys: Array<string> = [];
  values = [];
  totalRecords = 0;
  checked = false;
  product: Product;
  productsCount = 0;
  modalRef: BsModalRef;
  sorting: any;
  maxValue: any;
  filterManufacturersList: Array<string> = [];
  filterStatesList: Array<string> = [];
  valueReady = [];
  searchPhrase = '';
  collapseState = false;
  itemsPerPage = 9;
  sortOptions: Array<string> = ['Sortuj wg', SortOption[0], SortOption[1], SortOption[2]];
  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };


  constructor(private router: Router, private productService: ProductServiceService,
              private route: ActivatedRoute,
              private ngxService: NgxUiLoaderService,
              private modalService: BsModalService,
              private orderService: OrderService,
              private new1: HomeComponent,
              private httClient: HttpClient,
            ){



     const x = window.matchMedia('(max-width: 500px)');
     this.collapseState = x.matches;


     document.getElementById('articleRouter').style.display = 'none';
     this.productService.GetAllProductCategories().subscribe(value => {

      this.categories = value;

      this.keys   = Array.from(Object.keys(value));
      Object.values(value).map(value1 => {
        this.values.push(JSON.stringify(value1));
      });

      this.values.forEach((value2, index) => {
        const array  = value2.split(',');
        this.valueReady.push(array);
      });

      // this.mapLength = this.categories.size;


    });

  }


  ngOnInit(): void {


    this.sub = this.route.params.subscribe(params => {

      window.scrollTo(0, 0);
      this.ngxService.start();
      setTimeout(() => {
        this.ngxService.stop();
      }, 1000);
      this.id = params.name;
      this.minPrice = 0;
      this.maxPrice = 100000;
      this.page = 1;
      this.sortEnumIndex = 0;
      this.sorting = 'Sortuj wg';
      this.GetImagesMainFunction(this.page , this.id, this.minPrice, this.maxPrice, this.sortEnumIndex);
    });
  }


  ngOnDestroy(): void {
    document.getElementById('articleRouter').style.display = 'block';
    this.sub.unsubscribe();
  }

  ngAfterViewInit(): void {}

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


  RedirectToTechnicalDataComponent(id: number): void {
    this.router.navigate(['/sklep', {outlets: {route4: ['produkt', 'dane', id]}}]);
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
      idProduct: product.id,
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


  Sort(i: number): void {

    this.sortEnumIndex = i - 1;
    this.GetImagesMainFunction(this.page, this.id, this.minPrice , this.maxPrice, this.sortEnumIndex);
  }

  CloseAlertModal(): void {
    this.modalService.hide();
  }

  SortingPriceRanges(event: any): void{

   this.minPrice = event.currentTarget.dataset.low;
   this.maxPrice = event.currentTarget.dataset.high;

   this.GetImagesMainFunction(this.page, this.id, this.minPrice , this.maxPrice, this.sortEnumIndex);


   document.getElementById('productStart').scrollIntoView({behavior: 'smooth'});
   document.querySelectorAll<HTMLElement>('.priceValues').forEach(value => {
      value.style.color = '#727883';
      value.style.fontWeight  = 'inherit';
    });
   event.target.style.color  = 'black';
   event.target.style.fontWeight  = '600';

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


  GetGivenProducts(d: any, event): void {

    const b = Test2Pipe.transform(d);
    this.router.navigate(['/sklep', {outlets: {route4: ['produkty', b]}}]);
    document.getElementById('productStart').scrollIntoView({behavior: 'smooth'});

    document.querySelectorAll<HTMLElement>('.productCategoryName').forEach(value => {
    value.style.color = '#727883';
    value.style.fontWeight  = 'inherit';
    });
    event.target.style.color  = 'black';
    event.target.style.fontWeight  = '600';

  }

  ChangePage(event): void {
    this.ngxService.start();
    this.page = event;
    this.GetImagesMainFunction(this.page, this.id, this.minPrice , this.maxPrice, this.sortEnumIndex);
    this.ngxService.stop();

  }

  Check(): void {
    this.ngxService.start();
    this.GetImagesMainFunction(this.page, this.id, this.minPrice , this.maxPrice, this.sortEnumIndex);
    document.getElementById('productStart').scrollIntoView({behavior: 'smooth'});
    // this.maxPrice = '';
    // this.minPrice = '';
    document.querySelectorAll<HTMLElement>('.priceValues').forEach(value => {
      value.style.color = '#727883';
      value.style.fontWeight  = 'inherit';
    });
    this.ngxService.stop();

  }


  GetImagesMainFunction(page: number, id: string, minPrice: number, maxPrice: number, sortEnumIndex?: number): void{
    this.products = [];

    this.productService.GetProductsCurrentItem(page - 1, id, minPrice, maxPrice, sortEnumIndex).subscribe(result => {
      const map: Map<number, Array<Product>> = result;

      this.productsCount = +Object.keys(map);
      this.totalRecords =  +Object.keys(map);

      Array.from(Object.values(map)).forEach(async productsArray => {
        await productsArray.forEach(product => {
          this.productService.GetImageByPathFromService(product.pathToFile).subscribe(value => {
            this.createImageFromBlob(value, product);
          });

        });

        await this.AssignNamesToTables(productsArray);
        // await this.ngxService.stop();
      });
    });

  }


  }



