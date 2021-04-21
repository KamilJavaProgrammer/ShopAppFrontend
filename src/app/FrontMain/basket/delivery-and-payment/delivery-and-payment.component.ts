import {Component, ElementRef, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';
import {CompleteOrder, ProductBasket, OrderService} from '../../../order.service';
import {BasketComponent} from '../basket.component';
import {AuthGuard} from '../../../auth.guard';

@Component({
  selector: 'app-delivery-and-payment',
  templateUrl: './delivery-and-payment.component.html',
  styleUrls: ['./delivery-and-payment.component.css']
})
export class DeliveryAndPaymentComponent implements OnInit {

  tokenJwt: boolean;
  name: string;
  surname: string;
  email: string;
  address: string;
  postCode: string;
  town: string;

  businessAddress: string;
  businessPostCode: string;
  businessTown: string;
  businessEmail: string;
  businessName: string;
  NIP: string;

  deliveryOption: string;
  paymentMethod = 'Gotówka';
  invoiceCheckbox: boolean;

  order: CompleteOrder;

  @Input()
  sumMoney: number;

  @Input()
  orders: Array<ProductBasket>;


  @ViewChild('invoiceForm')
  invoiceForm: ElementRef;

  @Output() eventEmitter: EventEmitter<any> = new EventEmitter<any>();


  i = 3;
  h = 4;

  @ViewChild('orderAlert')
  orderAlert: TemplateRef<any>;



  constructor(private bsModalService: BsModalService,
              private basketComponent: BasketComponent,
              private orderService: OrderService,
              private authGuard: AuthGuard
              ) { }

  ngOnInit(): void {
    this.CheckJwtToken();
  }
  CheckJwtToken(): void{
     this.tokenJwt = this.authGuard.CheckExpirationDateToken();
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

  }
  ChangeStyleForParcelCourier(): void {
    document.getElementById('personalPickupButton').style.border = '3px solid #fad38e';
    document.getElementById('parcelCourierButton').style.border = '3px solid black';
    document.getElementById('parcelCourierOption').style.display = 'block';
    document.getElementById('personalPickupOption').style.display = 'none';
    this.AddCourierParcelToOrders();

    this.deliveryOption = 'Przesyłka Kurierska';
  }

  AddCourierParcelToOrders(): void{

        this.orderService.GetParcelData().subscribe(value => {

          this.basketComponent.parcelPrice = value.productPrice;
          this.basketComponent.sumMoney = this.basketComponent.sumMoney + +value.productPrice;
          // document.getElementById('parcel').style.visibility = 'visible';

          const promise = new Promise(resolve => {
            const productBasket: ProductBasket = ({
              nameOfProduct: value.productName,
              bruttoPrice: value.productPrice,
              numberOfItems: 1,
              idProduct: value.id

            });
            resolve(productBasket);
          });

          promise.then(value1 => {
            this.orders.push(value1);
          });

        });
  }


  Check(): void{
    if (isNaN(+this.NIP))
    {
      this.NIP = '';
      alert('NIP nie może zawierać liter');
    }
  }

  ChangePaymentMethodToHome(): void {
    this.paymentMethod = 'Pobranie';
  }

  ChangePaymentMethodOnTransfer(): void {
    this.paymentMethod = 'Przelew Bankowy';
  }

  // Clear(): void
  // {
  //   this.basketComponent.orders = [];
  //   sessionStorage.clear();
  //   this.name = '';
  //   this.surname = '';
  //   this.email = '';
  //   this.address = '';
  //   this.postCode = '';
  //   this.town = '';
  //   this.businessAddress = '';
  //   this.businessPostCode = '';
  //   this.businessTown = '';
  //   this.businessEmail = '';
  //   this.businessName = '';
  //   this.NIP = '';
  //   this.deliveryOption = '';
  //   this.invoiceCheckbox = false;
  //   this.basketComponent.toSupply();
  //
  // }



  Order(): void{

    this.bsModalService.show(this.orderAlert, {class: 'modal-lg'});

    const promise = new Promise((resolve, reject) => {

       this.order  = ({

        sumPaid: this.sumMoney,
        deliveryOption: this.deliveryOption,
        paymentMethod: this.paymentMethod,
        invoice: this.invoiceCheckbox,
        productsBasket: this.orders ,
        shopclient: ({
          name: this.name,
          surname: this.surname,
          email: this.email,
          business: ({
            name: this.businessName,
            nip: this.NIP,
            email: this.businessEmail,
            address: ({
              postCode: this.businessPostCode,
              town: this.businessTown,
              placeOfresident: this.businessAddress
            }),
          }),
          address: ({
            postCode: this.postCode,
            town: this.town,
            placeOfresident: this.address
          }),
        }),
         address: ({
           postCode: this.postCode,
           town: this.postCode,
           placeOfresident: this.address
         }),
         token: (this.tokenJwt !== null),
      });

       return resolve(this.order);

    });


    promise.then(value1 => {

        this.orderService.SendCompleteOrderToServerNoRegister(value1).subscribe(value12 => {
          console.log(value12);
        });
      });





  }
}
