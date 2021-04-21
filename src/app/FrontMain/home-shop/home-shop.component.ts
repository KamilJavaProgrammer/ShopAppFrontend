import {Component, ElementRef, OnDestroy, OnInit, TemplateRef, ViewChild, ViewEncapsulation} from '@angular/core';
import {Product, ProductServiceService} from '../../product-service.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DataserviceService} from '../../dataservice.service';
import {ProductBasket, OrderService} from '../../order.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import {ArticleLine, Section, SectionCategories, SectionService, SectionSubCategories} from '../../section.service';
import {HttpClient} from '@angular/common/http';
import {AuthGuard} from '../../auth.guard';

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


    if (this.authGuard.CheckExpirationDateToken() === true){
      this.account = 'Twoje konto';

    }
    else
    {
      this.account = 'Zaloguj się';
    }
    // this.Test();


    document.getElementById('navbar123').style.display = 'none';
    this.GetImages();
    this.GetSectionsFromServer();
  }

  ngOnDestroy(): void {
  }


  public GetSectionsFromServer(): void{

    this.sectionService.GetAllSectionsFromBackend().subscribe(value => {
            this.sections = value;
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
            name: 'Herbata',
            sectionSubCategoriesList: [
              ({
                name: 'YerbaMate'
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
            name: 'Kawa',
            sectionSubCategoriesList: [
              ({
                name: 'Kawa ziarnista'
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
}

