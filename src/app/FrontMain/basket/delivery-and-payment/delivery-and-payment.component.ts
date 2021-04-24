import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {CompleteOrder, ProductBasket, OrderService} from '../../../order.service';
import {BasketComponent} from '../basket.component';
import {AuthGuard} from '../../../auth.guard';
import {UserService} from '../../../user.service';
import {ShopClient} from '../../../client-service.service';
import {Product, ProductServiceService} from '../../../product-service.service';
import {HomeShopComponent} from '../../home-shop/home-shop.component';

@Component({
  selector: 'app-delivery-and-payment',
  templateUrl: './delivery-and-payment.component.html',
  styleUrls: ['./delivery-and-payment.component.css']
})
export class DeliveryAndPaymentComponent implements OnInit {

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

  deliveryOption: string;
  paymentMethod = 'Gotówka';
  invoiceCheckbox: boolean;

  completeOrder: CompleteOrder;

  @Input() sumMoney: number;
  @Input() orders: Array<ProductBasket>;
  @ViewChild('invoiceForm') invoiceForm: ElementRef;


  i = 3;
  h = 4;

  @ViewChild('orderAlert') orderAlert: TemplateRef<any>;



  constructor(private bsModalService: BsModalService,
              private basketComponent: BasketComponent,
              private orderService: OrderService,
              private authGuard: AuthGuard,
              private userService: UserService,
              private productService: ProductServiceService,
              private homeShopComponent: HomeShopComponent
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
     document.getElementById('selectOption').style.display = 'none';
     document.getElementById('OrderForm').style.display = 'block';
}

  AddFormInvoice(): void {

    if (this.invoiceForm.nativeElement.checked === true) {
      document.getElementById('invoiceForm').style.display = 'block';
      this.invoiceCheckbox = true;
      this.i = 4;
      this.h = 5;
    }
    else
    {
      document.getElementById('invoiceForm').style.display = 'none';
      this.invoiceCheckbox = false;
      this.i = 3;
      this.h = 4;
    }
  }

  ChangeStyleForPersonalPickup(): void {
    document.getElementById('parcelCourierButton').style.border = '3px solid #fad38e';
    document.getElementById('personalPickupButton').style.border = '3px solid black';
    document.getElementById('parcelCourierOption').style.display = 'none';
    document.getElementById('personalPickupOption').style.display = 'block';
    this.deliveryOption = 'Odbiór osobisty';
    this.DeleteCourierParcelToOrders();


  }
  ChangeStyleForParcelCourier(): void {
    document.getElementById('personalPickupButton').style.border = '3px solid #fad38e';
    document.getElementById('parcelCourierButton').style.border = '3px solid black';
    document.getElementById('parcelCourierOption').style.display = 'block';
    document.getElementById('personalPickupOption').style.display = 'none';
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
}
