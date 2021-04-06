import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ProductBasket, OrderService} from '../../order.service';
import {Product, ProductServiceService} from '../../product-service.service';
import {DataserviceService} from '../../dataservice.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {BsModalService} from 'ngx-bootstrap/modal';
import {HomeShopComponent} from '../home-shop/home-shop.component';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit, OnDestroy {

  products = [];
  order: ProductBasket;
  path = 'http://localhost:8088/image';

  sub: any;
  id: any;
  formData: any;
  div: HTMLElement;
  value: any;
  table = [];

  maxValue: any;
  product: any;

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







  constructor(private productService: ProductServiceService,
              private dataserviceService: DataserviceService,
              private route: ActivatedRoute,
              private ngxService: NgxUiLoaderService,
              private modalService: BsModalService,
              private orderService: OrderService,
              private homeShopComponent: HomeShopComponent,
              private router: Router) {
  }



  ngOnInit(): void {
     document.getElementById('article').style.display = 'none';



     this.sub = this.route.params.subscribe(params => {

     this.ngxService.start();
     setTimeout(() => {
       this.ngxService.stop();
     }, 100);



     this.sorting = 'Sortuj wg';
     this.id = params.name;
     this.formData = new FormData();
     this.formData.append('searchText', this.id);
     this.GetImages(this.formData);

     });


  }
  ngOnDestroy(): void {
    document.getElementById('article').style.display = 'block';
  }


  GetImages(formData: FormData): void{

    this.productService.GetAllSearchingProduct(formData).subscribe(value => {

      this.products = [];

      value.forEach(value1 => {
        this.getImageFromService(value1);
      });
    });
  }

  getImageFromService(product: Product): void {
    const pathImage = product.pathToFile.replace('C:/ZdjęciaBaza/Upload', '');
    this.productService.GetPhotos(this.path + pathImage).subscribe(data => {
      this.createImageFromBlob(data, product);
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

  RedirectToTechnicalDataComponent(id: number): void {
    this.router.navigate(['/shop', {outlets: {route4: ['technicalData', id]}}]);
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



}
