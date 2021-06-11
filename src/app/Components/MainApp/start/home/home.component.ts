import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import {Product, ProductServiceService} from '../../../../Services/product-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {OrderService, ProductBasket} from '../../../../Services/order.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ArticleLine, Section, SectionService} from '../../../../Services/section.service';
import {HttpClient} from '@angular/common/http';
import {AuthGuard} from '../../../../Guard/auth.guard';
import {NgbCarousel, NgbCarouselConfig} from '@ng-bootstrap/ng-bootstrap';
import 'jquery';
import {UserService} from '../../../../Services/user.service';
import {MongoServiceService} from '../../../../Services/mongo-service.service';
import {DomSanitizer} from '@angular/platform-browser';
import { CollapseComponent } from 'angular-bootstrap-md';


// tslint:disable-next-line:typedef
function CloseSearchingInput() {
  $('#search, #search button.close').removeClass('open');
}


// tslint:disable-next-line:typedef
function SwitchMobileMenu() {
  $(document).ready(function() {

    const sideslider = $('[data-toggle=collapse-side]');
    const sel = sideslider.attr('data-target');
    const sel2 = sideslider.attr('data-target-2');
    $(sel).toggleClass('in');
    $(sel2).toggleClass('out');
  });
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {




  @ViewChildren(CollapseComponent) collapses: CollapseComponent[];

  @ViewChild('basket') koszyk: ElementRef;
  @ViewChild('alert') alert: TemplateRef<any>;
  @ViewChild('addProductBasket') addProductToBasket: TemplateRef<any>;
  sections: Array<Section> = [];
  products: Array<Product> = [];
  articleLines: Array<ArticleLine> = [];
  order: ProductBasket;
  basketSum = 0;
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
  headerBarDataLeft = '';
  headerBarDataCenter = '';
  headerBarDataRight = '';

  counter = 0;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };
  customClass = 'custom-accordion-style';



  value =  true;

  days = 1;
  hours = 5;
  minutes = 10;
  seconds = 45;
  articleLineIndex = 0;

  searchIndex = 0;
  subscriberEmail = '';
  footerContactTown = '';
  footerContactEmail = '';
  footerContactPhone = '';
  text = '          <div  class="hero__items set-bg  main-background carousel-item active"  style="background-image: url(\'/assets/img/kawa9.jpg\');">\n' +
    '            <div class="container">\n' +
    '              <div class="row" style="margin-top: 120px;">\n' +
    '                <div class="col-xl-5 col-lg-7 col-md-8" >\n' +
    '                  <h2 class="" data-aos="fade-left" data-aos-delay="0" style="color: pink;font-family:\'Nunito Sans\' ; user-select: none;">Przyjemność która</h2>\n' +
    '\n' +
    '                  <div class="" data-aos="fade-left" data-aos-delay="350">\n' +
    '                    <h2 style="color: violet; padding-top: 10px;">mieści się w filiżance kawy</h2>\n' +
    '                    <p style="color: #f3f3f3; font-family: \'DejaVu Serif\';">Stwórz kawiarnię we własnym domu.</p>\n' +
    '                    <a   (click)="RedirectToProductSection()" style="border: 1px solid white; color: #f3f3f3; font-family: Raleway;" class="btn cyc">Sprawdź ofertę<i style="margin-left: 5px;" class="la la-arrow-right"></i></a>\n' +
    '                  </div>\n' +
    '                </div>\n' +
    '              </div>\n' +
    '            </div>\n' +
    '          </div>';

   text21: any;





  smallDevicesCarouselLinks: Array<string> = ['https://mfiles.alphacoders.com/792/792419.jpg', 'https://i.pinimg.com/originals/9b/1a/a0/9b1aa04c4beb7fe049d71b5fe8e56376.jpg'];


  constructor( private productService: ProductServiceService, private router: Router,
               private ngxService: NgxUiLoaderService, private route: ActivatedRoute,
               private orderService: OrderService,
               private modalService: BsModalService,
               private sectionService: SectionService,
               private httpClient: HttpClient,
               private authGuard: AuthGuard,
               private userService: UserService,
               private mongoService: MongoServiceService,
               protected sanitizer: DomSanitizer,
               config: NgbCarouselConfig,
               private elementRef: ElementRef)

  {
    config.interval = 12000;
    config.keyboard = true;
    config.pauseOnHover = true;
    config.wrap = true;
    this.text21  = this.sanitizer.bypassSecurityTrustHtml(this.text);

    // document.addEventListener('load', () => document.append(this.dzik2));
    this.StartClock();


  }




  ngOnInit(): void {

    // this.StartClock();

    this.ngxService.start();
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


    this.GetHeaderData();
    this.GetFooterData();
    this.GetImages();
    this.GetSectionsFromServer();


  }

  ngOnDestroy(): void {

  }

  ngAfterViewInit(): void {

    Promise.resolve().then(() => {
      this.collapses.forEach((collapse: CollapseComponent) => {
        collapse.toggle();
      });
    });

    const elem = this.elementRef.nativeElement.querySelector('.cyc');
    if (elem) {
      elem.addEventListener('click', () => this.RedirectToProductSection());
    }  }

  ChangeState(): void
  {
    Promise.resolve().then(() => {
      this.collapses.forEach((collapse: CollapseComponent) => {
        if (!collapse.isCollapsed)
        {
          collapse.toggle();
        }
      });
    });
  }


  SwitchMenu(): void{
    Promise.resolve().then(() => {
      this.collapses.forEach((collapse: CollapseComponent) => {
        if (!collapse.isCollapsed)
        {
          collapse.toggle();
        }
      });
    });
     // this.value = true;
    SwitchMobileMenu();

  }

  public GetHeaderData(): void{
    this.mongoService.GetDataFromMongoById('headerText').subscribe(value => {
      this.headerBarDataLeft = value.data[0];
      this.headerBarDataCenter = value.data[1];
      this.headerBarDataRight = value.data[2];
    });

  }

  public GetFooterData(): void{
    this.mongoService.GetDataFromMongoById('footerContact').subscribe(value => {
      this.footerContactTown = value.data[0];
      this.footerContactEmail = value.data[1];
      this.footerContactPhone = value.data[2];
    });

  }

  public GetSectionsFromServer(): void{

    this.sectionService.GetAllSectionsFromBackend().subscribe(value => {
      this.sections = value;
      this.ngxService.stop();

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
      document.getElementById('articleLine').style.color = 'rgb(17, 17, 17)';

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



  Login(): void {
      this.SwitchMenu();
      if (this.authGuard.CheckExpirationDateToken() === true){

      this.router.navigate(['/sklep', {outlets: {route4: 'konto'}}]);
      this.account = 'Twoje konto';

    }
    else
    {
      this.router.navigate(['/sklep', {outlets: {route4: ['logowanie']}}]);
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
    this.router.navigate(['/sklep', {outlets: {route4: ['produkty', this.search]}}]);
    this.search = '';
    CloseSearchingInput();
  }



  RedirectToTechnicalDataComponent(id: number): void {
    this.router.navigate(['/sklep', {outlets: {route4: ['produkt', 'dane', id]}}]);
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

  RedirectToProductSection(): void{
    document.getElementById('productSection').scrollIntoView({behavior: 'smooth'});
  }


  AttachNewSubcriber(): void {

    if (this.subscriberEmail.length < 1)
    {
      alert('E-mail nie może być pusty');
    }
    else
    {
      alert('Dodaliśmy Twój e-mail do newslettera');
      this.userService.AddNewSubscriber(this.subscriberEmail).subscribe(value => {
        this.subscriberEmail = '';
      });
    }

  }

  test(): void {

    document.getElementById('test').style.visibility = 'visible';
    document.getElementById('test').style.top = '1px';
    document.getElementById('test').style.opacity = '1';
    document.getElementById('nameproduct').style.display = 'none';


  }
}

