
import {Component, ElementRef, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {CompleteOrder, ProductBasket, OrderService} from '../../../../Services/order.service';
import {AuthGuard} from '../../../../Guard/auth.guard';
import {UserService} from '../../../../Services/user.service';
import {ShopClient} from '../../../../Services/client-service.service';
import {Product, ProductServiceService} from '../../../../Services/product-service.service';
import {HomeComponent} from '../../start/home/home.component';
import {BasketShopComponent} from '../basket-shop/basket-shop.component';
import {Router} from '@angular/router';

@Component({
  selector: 'app-delivery',
  templateUrl: './delivery.component.html',
  styleUrls: ['./delivery.component.css']
})
export class DeliveryComponent implements OnInit {


  @ViewChild('absent')
  template: TemplateRef<any>;

  tokenJwt: boolean;



  shopClient: ShopClient = ({
    name: '',
    surname: '',
    email: '',
    state: '',
    phoneNumber: '',
    address: ({
      postCode: '',
      town: '',
      placeOfresident: '',
    }),
    business: ({
      nip: '',
      phoneNumber: '',
      name: '',
      email: '',
      account: '',
      regon: '',
      address: ({
        postCode: '',
        town: '',
        placeOfresident: '',
      }),
    })
  });

  parcel: Product;
  delivery: boolean;

  deliveryOption: string;
  paymentMethod = 'Gotówka';
  invoiceCheckbox: boolean;

  completeOrder: CompleteOrder;

  @Input() sumMoney: number;
  @Input() orders: Array<ProductBasket>;
  @ViewChild('invoiceForm') invoiceForm: ElementRef;
  @ViewChild('orderAlert') orderAlert: TemplateRef<any>;


  test = 1;




  constructor(private bsModalService: BsModalService,
              private basketComponent: BasketShopComponent,
              private orderService: OrderService,
              private authGuard: AuthGuard,
              private userService: UserService,
              private productService: ProductServiceService,
              private homeShopComponent: HomeComponent,
              private router: Router
  ) { }

  ngOnInit(): void {
    this.CheckJwtToken();
  }
  CheckJwtToken(): void{
    this.tokenJwt = this.authGuard.CheckExpirationDateToken();
    if (this.tokenJwt === true){
      this.GetShopClient();
    }
    this.GetParcelData();
  }

  GetShopClient(): void{
    this.userService.GetShopClient().subscribe(value => {
      this.shopClient = value;
    });
  }


  BuyNoRegister(): void {
    document.getElementById('options').style.display = 'none';

    const element = document.getElementById('OrderForm');
    element.style.display = 'block';
    element.scrollIntoView({behavior: 'smooth', block: 'start'});
    element.style.marginTop = '150px';


    const numberStep = 1;
    this.test = numberStep;
    const list: NodeListOf<HTMLElement> = document.querySelectorAll('.step');

    list.forEach((value) => {
      if (value.dataset.step <= '1')
      {
        value.classList.add('active');
      }
      else
      {
        value.classList.remove('active');
      }
    });
  }

  AddFormInvoice(): void {
    (this.invoiceForm.nativeElement.checked) ? this.invoiceCheckbox = true : this.invoiceCheckbox = false;
  }

  ChangeStyleForPersonalPickup(): void {
    document.getElementById('parcelCourierButton').style.border = '3px solid #fad38e';
    document.getElementById('personalPickupButton').style.border = '3px solid black';
    this.deliveryOption = 'Odbiór osobisty';
    this.delivery = false;
    this.DeleteCourierParcelToOrders();


  }
  ChangeStyleForParcelCourier(): void {
    document.getElementById('personalPickupButton').style.border = '3px solid #fad38e';
    document.getElementById('parcelCourierButton').style.border = '3px solid black';
    this.delivery = true;
    this.AddCourierParcelToOrders();

    this.deliveryOption = 'Przesyłka Kurierska';
  }

  createImageFromBlob(image: Blob, product: Product): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {

      this.parcel.imageByte = reader.result;

    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }

  GetParcelData(): void{
    this.orderService.GetParcelData().subscribe(product => {
      this.parcel = product;
      this.basketComponent.parcelPrice = +product.productPrice;
      this.basketComponent.sumMoney = this.basketComponent.sumMoney + +product.productPrice;
      this.productService.getImageFromService(product).subscribe(blob => {
        this.createImageFromBlob(blob, product);
      });
    });
  }

  AddCourierParcelToOrders(): void{
    this.orderService.CheckExistsOrder(this.parcel, result => {
      if (result === false){

        const promise = new Promise(resolve => {
          const productBasket: ProductBasket = ({
            nameOfProduct: this.parcel.productName,
            bruttoPrice: +this.parcel.productPrice,
            numberOfItems: 1,
            idProduct: this.parcel.id,
            image: this.parcel.imageByte

          });
          resolve(productBasket);
        });

        promise.then(value1 => {
          this.orderService.AddOrder(value1);
        });
      }
      else
      {

      }
    });


  }


  DeleteCourierParcelToOrders(): void{
    this.orderService.CheckExistsOrder(this.parcel, result => {
      if (result === true){

        const promise = new Promise(resolve => {
          const productBasket: ProductBasket = ({
            nameOfProduct: this.parcel.productName,
            bruttoPrice: +this.parcel.productPrice,
            numberOfItems: 1,
            idProduct: this.parcel.id,
            image: this.parcel.imageByte

          });
          resolve(productBasket);
        });

        promise.then(value1 => {
          this.orderService.DeleteOrder(value1);
        });
      }
      else
      {

      }
    });


  }



  Check(): void{
    if (isNaN(+this.shopClient.business.nip))
    {
      this.shopClient.business.nip = '';
      alert('NIP nie może zawierać liter');
    }
  }

  ChangePaymentMethodToHome(): void {
    this.paymentMethod = 'Pobranie';
  }

  ChangePaymentMethodOnTransfer(): void {
    this.paymentMethod = 'Przelew Bankowy';
  }

  Clear(): void
  {
    this.basketComponent.orders = [];
    this.orderService.table = [];
    sessionStorage.clear();
    this.invoiceCheckbox = false;
    this.basketComponent.toSupply();
    this.homeShopComponent.basketSum = 0;
    this.homeShopComponent.productAmount = 0;

  }



  Order(): void{


    const promise = new Promise((resolve, reject) => {

      this.completeOrder  = ({

        sumPaid: this.sumMoney,
        deliveryOption: this.deliveryOption,
        paymentMethod: this.paymentMethod,
        invoice: this.invoiceCheckbox,
        productsBasket: this.orders ,
        shopclient: this.shopClient,

        address: ({
          postCode: this.shopClient.address.postCode,
          town: this.shopClient.address.town,
          placeOfresident: this.shopClient.address.placeOfresident
        }),
        token: sessionStorage.getItem('accessToken'),
      });

      return resolve(this.completeOrder);

    });


    promise.then(completeOrder => {
      this.orderService.SendCompleteOrderToServer(completeOrder).subscribe(response => {
        this.bsModalService.show(this.orderAlert, {class: 'modal-lg'});
        this.Clear();
      });
    });





  }

  RedirectToLogin(): void {
    this.router.navigate(['/sklep', {outlets: {route4: ['logowanie']}}]);
    document.getElementById('mainAnchor').scrollIntoView({behavior:  'smooth', block: 'end'});
  }
  RedirectToRegister(): void {
    this.router.navigate(['/sklep', {outlets: {route4: ['rejestracja']}}]);
    document.getElementById('mainAnchor').scrollIntoView({behavior:  'smooth'});
  }

  ChangeView(event): void {
    const numberStep = event.currentTarget.dataset.step;
    this.test = numberStep;
    const list: NodeListOf<HTMLElement> = document.querySelectorAll('.step');

    list.forEach((value, index) => {
           if (value.dataset.step <= numberStep)
           {
             value.classList.add('active');
           }
           else
           {
             value.classList.remove('active');
           }
    });


  }
}
