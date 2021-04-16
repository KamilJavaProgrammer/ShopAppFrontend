import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Product, ProductServiceService} from '../../product-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataserviceService} from '../../dataservice.service';
import {ProductBasket, OrderService} from '../../order.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {Section, SectionCategories, SectionService, SectionSubCategories} from '../../section.service';
import {log} from 'util';


@Component({
  selector: 'app-home-shop',
  templateUrl: './home-shop.component.html',
  styleUrls: ['./home-shop.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeShopComponent implements OnInit, OnDestroy {


  constructor(private dataService: DataserviceService, private productService: ProductServiceService, private router: Router,
              private ngxService: NgxUiLoaderService, private route: ActivatedRoute,
              private orderService: OrderService,
              private modalService: BsModalService,
              private sectionService: SectionService){}


    basketSum: number;

  @ViewChild('abcde') abcde: ElementRef;
  @ViewChild('basket') basket: ElementRef;

  // productFromBasket: Product;

  sections: Array<Section> = [];
  products = [];
  products1 = [];
  order: ProductBasket;
  search: string;
  productAmount: number;
  path = 'http://localhost:8088/image';
  table = [];
  listy: Array<Array<Product>>;
  sub: any;

  orders: Array<ProductBasket> = [];

  modalRef: BsModalRef;
  value12 = 1000;
  highValue12 = 2000;
  sorting: any;
  maxValue: any;
  product: Product;

  byk: BsModalRef;


  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };


  config1 = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'xxl'
  };

  @ViewChild('alert')
  alert: TemplateRef<any>;

  @ViewChild('addProductBasket')
  addProductToBasket: TemplateRef<any>;

  @ViewChild('login')
  login: TemplateRef<any>;
  account: string;
  headerData = 'Masz pytania dzwoń! 185556372';

  ngOnInit(): void {


    this.ngxService.start();
    setTimeout(() => {
      this.ngxService.stop();
    }, 500);

    this.orders = JSON.parse(sessionStorage.getItem('tableOrders'));
    this.basketSum = 0;
    this.productAmount = 0;
    if (this.orders !== null)
    {
      this.orders.forEach(order => {
        this.basketSum = this.basketSum + (order.bruttoPrice * order.numberOfItems);
        this.productAmount = this.productAmount + +order.numberOfItems;

      });
    }

    if (sessionStorage.getItem('tokenJwt') !== null){

      this.account = 'Twoje konto';
    }
    else
    {
      this.account = 'Zaloguj się';

    }


    document.getElementById('navbar123').style.display = 'none';
    this.GetImages();
    this.GetSectionsFromServer();
      this.Test();
  }

  ngOnDestroy(): void {
  }


  public GetSectionsFromServer(): void{

    this.sectionService.GetAllSectionsFromBackend().subscribe(value => {
            this.sections = value;
    });
  }

  GetImages(): void {
    this.products = [];
    this.products1 = [];


    this.productService.GetTwoListFromBackend().subscribe(value => {
      this.listy = value;

      this.listy[0].forEach(value1 => {
        this.getImageFromService(value1);
      });

      this.listy[1].forEach(value2 => {
        this.getImageFromService1(value2);
      });

    });
  }

  getImageFromService(product): void {
    const pathImage = product.pathToFile.replace('C:/ZdjęciaBaza/Upload', '');

    this.productService.GetPhotos(this.path + pathImage).subscribe(data => {
      this.createImageFromBlob(data, product);
    });
  }

  getImageFromService1(product): void {
    const pathImage = product.pathToFile.replace('C:/ZdjęciaBaza/Upload', '');

    this.productService.GetPhotos(this.path + pathImage).subscribe(data => {
      this.createImageFromBlob1(data, product);
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

  createImageFromBlob1(image: Blob, product: Product): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {
      product.imageByte = reader.result;
      this.products1.push(product);
    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  Login(): void{

    if (sessionStorage.getItem('response') !== null){
      const table = sessionStorage.getItem('response').split('/');
      this.router.navigate(['/shop', {outlets: {route4: ['konto', table[2]]}}]);
    }
    else {
      this.router.navigate(['/shop', {outlets: {route4: ['logowanie']}}]);
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
    this.basketSum = this.basketSum + +product.productPrice;
    this.productAmount++;
    this.order = ({
      idProduct: product.id,
      image: product.imageByte,
      nameOfProduct: product.productName,
      bruttoPrice: +product.productPrice,
      numberOfItems: 1
    });
    this.orderService.AddOrder(this.order);
    this.modalService.show(this.addProductToBasket, {class: 'modal-md'});


  }


  RedirectToSearchingComponent(): void {
    this.router.navigate(['/shop', {outlets: {route4: ['name', this.search]}}]);
    this.search = '';
  }



  RedirectToTechnicalDataComponent(id: number): void {
    this.router.navigate(['/shop', {outlets: {route4: ['technicalData', id]}}]);
  }


  ScrollToTop(): void {
    document.getElementById('anchor').scrollIntoView({behavior: 'smooth'});
  }

  ScrollToContact(): void {
    document.getElementById('contact').scrollIntoView({behavior: 'smooth'});
  }


  GoToHomePage(): void
  {
    this.ngxService.start();

    setTimeout(() => {
      this.ngxService.stop();
    }, 500);
  }

  HideLoginModal(): void{
   this.byk.hide();
  }




  Test(): void{
    console.log('start');
    const promise = new Promise(resolve => {
      const section: Section = ({
        name: 'Kawa',
        sectionCategoriesList: [
          ({
            name: 'Owoce',
            sectionSubCategoriesList: [
              ({
                 name: 'Jablko'
              }),
              ({
                name: 'Banan'
              }),
              ({
                name: 'Pomarancz'
              }),
            ]
          }),
          ({
            name: 'Warzywa',
            sectionSubCategoriesList: [
              ({
                name: 'Ogorek'
              }),
              ({
                name: 'pomidor'
              }),
              ({
                name: 'pietruszka'
              }),
            ]
          })
        ]
      });

      resolve(section);
    });

    promise.then(value => {
      this.sectionService.Test(value).subscribe(value1 => {
        console.log(value1);
        console.log(value1);
      });
    });

  }


}

