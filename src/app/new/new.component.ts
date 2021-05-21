import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import set = Reflect.set;
import {Product, ProductServiceService} from '../product-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {OrderService, ProductBasket} from '../order.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ArticleLine, Section, SectionService} from '../section.service';
import {HttpClient} from '@angular/common/http';
import {AuthGuard} from '../auth.guard';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css'],

})
export class NewComponent implements OnInit, OnDestroy {


  constructor( private productService: ProductServiceService, private router: Router,
               private ngxService: NgxUiLoaderService, private route: ActivatedRoute,
               private orderService: OrderService,
               private modalService: BsModalService,
               private sectionService: SectionService,
               private httpClient: HttpClient,
               private authGuard: AuthGuard){}




  @ViewChild('basket') koszyk: ElementRef;
  @ViewChild('alert') alert: TemplateRef<any>;
  @ViewChild('addProductBasket') addProductToBasket: TemplateRef<any>;
  sections: Array<Section> = [];
  products: Array<Product> = [];
  articleLines: Array<ArticleLine> = [];
  order: ProductBasket;
  basketSum: number;
  search: string;
  productAmount: number;
  path = 'http://localhost:8088/image';
  table = [];
  sub: any;
  orders: Array<ProductBasket> = [];
  maxValue: any;
  product: Product;
  byk: BsModalRef;
  account = 'Zaloguj się';
  headerData = 'Masz pytania dzwoń! 185556372';

  counter = 0;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };
  customClass = 'custom-accordion-style';





  descritpions: Array<string> = ['regulator1', 'crema2', 'suspa3', 'asas4', 'asas5', 'asas6', 'asas7', 'asas8'];
  days = 1;
  hours = 0;
  minutes = 0;
  seconds = 5;
  articleLineIndex = 0;

  ngOnInit(): void {

    this.StartClock();

    this.ngxService.startLoader('1');
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


    if (this.authGuard.CheckExpirationDateToken() === true){
      this.account = 'Twoje konto';

    }
    else
    {
      this.account = 'Zaloguj się';
    }


    this.GetImages();
    this.GetSectionsFromServer();
  }

  ngOnDestroy(): void {
  }


  public GetSectionsFromServer(): void{

    this.sectionService.GetAllSectionsFromBackend().subscribe(value => {
      this.sections = value;
      this.ngxService.stopLoader('1');

    });
  }


  GetImages(): void{
    this.products = [];
    this.articleLines = [];

    const promise3 = new Promise(resolve => {
      this.sectionService.GetAllArticleLinesFromBackend().subscribe(articleLinesList => {
        resolve(articleLinesList);
      });
    });

    promise3.then(async linelist => {

      // @ts-ignore
      for (const  articleLine of linelist){
        for (const product of articleLine.productList){
          await this.getImageFromService(product);
        }
        const articleLineObject: ArticleLine = ({
          id: articleLine.id ,
          name: articleLine.name,
          productList: this.products
        });
        await this.articleLines.push(articleLineObject);
        this.products = [];
      }

    });
  }

  async getImageFromService(product): Promise<any> {
    const pathImage = product.pathToFile.replace('C:/ZdjęciaBaza/Upload', '');
    await this.httpClient.get(this.path + pathImage, {responseType: 'blob'}).toPromise()
      .then(image => this.createImageFromBlob(image, product).then(value => {
        this.products.push(product);
      }));

  }

  async createImageFromBlob(image: any, product: Product): Promise<void> {
    const reader = new FileReader();
    reader.addEventListener('load',  () => {
      product.imageByte = reader.result;
    }, false);
    if (image) {
      reader.readAsDataURL(image);
    }
  }



  Login(): void{

    if (this.authGuard.CheckExpirationDateToken() === true){
      this.router.navigate(['/shop', {outlets: {route4: 'konto'}}]);
      this.account = 'Twoje konto';

    }
    else
    {
      this.router.navigate(['/shop', {outlets: {route4: ['logowanie']}}]);
      this.account = 'Zaloguj się';
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
    document.getElementById('home').scrollIntoView({behavior: 'smooth'});
  }

  ScrollToContact(): void {
    document.getElementById('footer').scrollIntoView({behavior: 'smooth'});
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



  ShowMenuSmallDevices(): void {
    if (this.counter === 0){
      this.counter = 1;
      document.getElementById('navSmallDevices').style.display = 'block';
    }
    else {
      this.counter = 0;
      document.getElementById('navSmallDevices').style.display = 'none';
    }
  }

  CheckDays(): void{
    if (this.hours > 0) {
      this.days--;
      this.hours = 23;
      this.minutes = 59;
      this.seconds = 59;
    }
    else if (this.hours === 0) {
      this.seconds = 0;
      this.minutes = 0;
      this.hours = 0;
      this.days = 0;
    }

    else
    {
      this.hours = 0;
    }

  }



  CheckHours(): void{
    if (this.hours > 0) {
      this.hours--;
      this.minutes = 59;
      this.seconds = 59;
    }
    else if (this.hours === 0) {
           this.CheckDays();
    }

    else
    {
      this.hours = 0;
    }

  }

  CheckMinutes(): void{
    if (this.minutes > 0) {
      this.minutes--;
      this.seconds = 59;
    }
    else if (this.minutes === 0) {
          this.CheckHours();
    }

    else
    {
      this.minutes = 0;
    }

  }


  StartClock(): void {

    setInterval(() => {
      if (this.seconds > 0) {
        this.seconds--;
      }
      else if (this.seconds === 0) {
          this.CheckMinutes();
      }

      else
      {
        this.seconds = 0;
      }

      console.log(this.seconds);

    }, 1000);

  }


  ChangeColor(): void
  {
    const c: NodeListOf<HTMLElement>  = document.querySelectorAll('.listElement');
    c.forEach(value => {
      value.style.color = '#b7b7b7';
    });

  }


  SwitchProductsSection(i: number, event): void {
     this.articleLineIndex = i;
     this.ChangeColor();
     event.target.style.color = '#111111';
  }
}
