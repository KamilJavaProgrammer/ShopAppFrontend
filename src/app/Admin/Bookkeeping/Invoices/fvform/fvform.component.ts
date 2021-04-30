import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Client, InvoiceInterface, Product, ProductServiceService} from '../../../../product-service.service';
import {Invoice} from '../../../../invoice.model';
import {ClientServiceService} from '../../../../client-service.service';
import {Business, OrderService, ProductBasket} from '../../../../order.service';

@Component({
  selector: 'app-fvform',
  templateUrl: './fvform.component.html',
  styleUrls: ['./fvform.component.css']
})
export class FVformComponent implements OnInit {


  productBaskets: Array<ProductBasket> = [];

  invoiceObject: InvoiceInterface = ({
    buyer: '',
    date : '',
    nip : '',
    recipient: '',
    sumVatValue: 0,
    sumBruttoValue: 0,
    sumNettoValue: 0,
    spendFromStock: 'Główny magazyn',
    paid: '',
    payForm: 'Gotówka',
    paymentDeadline: '0',
     business: ({
       nip: '',
       phoneNumber: '',
       name: '',
       email: '',
       regon: '',
       address: ({
         postCode: '',
         placeOfresident: '',
         town: '',
       })
     }),
    productBaskets: this.productBaskets
   });








  products: Array<Product>;
  invoice = new Invoice();
  dataArray: Array<Invoice> = [];
  search: string;
  i = 1;
  sumVatValue = 0;
  sum1VatValue = 0;
  sumNettoValue = 0;
  sum1NettoValue = 0;
  sumBruttoValue = 0;
  sum1BruttoValue = 0;
  value: string;
  value1: string;
  roundVatValue: string;
  roundNettoValue: string;
  roundBruttoValue: string;
  searchArray: Array<string> = [];
  roundVat2Value: string;
  roundNetto2Value: string;
  roundBrutto2Value: string;
  account = '123456789';
  businesses: Array<Business> = [];



  constructor(private productService: ProductServiceService,
              private clientService: ClientServiceService,
              private orderService: OrderService) {

  }

  public ngOnInit(): void {
    this.dataArray = [];

    this.GetAllBusiness();
    this.GetAllProduct();
    this.invoiceObject.date = new Date().toLocaleDateString();
    // this.AddProductRow();
    this.sumBruttoValue = +this.value1;

  }

  AddProductRow(): void {

    const invoiceData = new Invoice();
    invoiceData.lp = this.i++;
    invoiceData.unit = 'szt';
    invoiceData.rateVat = '23%';
    invoiceData.cod = 'F16';
    invoiceData.discount = 0.00;
    this.dataArray.push(invoiceData);
  }

  GetAllProduct(): void {
    this.productService.GetAllProducts().subscribe(products => {
      this.products = products;
    });
  }

  GetAllBusiness(): void {
    this.clientService.GetAllBusiness().subscribe(businesses => {
      this.businesses = businesses;
    });
  }


  AddProductData(): void {

    this.searchArray = this.search.split('-');
    const index = +this.searchArray[1];

    if (+this.products[index].numberOfItems < 1){
      alert('Masz za mało produktów');
      this.search = '';
    }
    else
    {
      this.invoice  = new Invoice();
      this.invoice.lp = this.i++;
      this.invoice.quantity = 1;
      this.invoice.nameProduct = this.products[index].productName;
      this.search = '';
      this.invoice.cod = this.products[index].cod;
      this.invoice.id = this.products[index].id;
      this.invoice.discount = 0;
      this.invoice.rateVat = '23%';
      this.invoice.nettoPrice = +(+this.products[index].productPrice / 1.23).toFixed(2);
      this.dataArray.push(this.invoice);
      this.CountPart();
     }
  }






  Remove(index): void {

    this.dataArray.splice(index, 1);
    let i = 1;
    this.dataArray.forEach(value2 => {
      value2.lp = i++;
    });
    this.i = i;
    this.CountAll();
  }



  CountPart(): void {

    if (this.invoice.quantity < 1) {
      alert('zbyt mała liczba');
    }

    else {

      this.invoice.nettoValue = (this.invoice.nettoPrice * this.invoice.quantity) - this.invoice.discount;

      if (this.invoice.rateVat === '23%') {
        this.invoice.bruttoValue = this.invoice.nettoValue * 1.23;
      } else if (this.invoice.rateVat === '8%') {
        this.invoice.bruttoValue = this.invoice.nettoValue * 1.08;
      }
      this.invoice.vatValue = this.invoice.bruttoValue - this.invoice.nettoValue;

      this.roundVat2Value = this.invoice.vatValue.toFixed(2);
      this.invoice.vatValue = +this.roundVat2Value;

      this.roundNetto2Value = this.invoice.nettoValue.toFixed(2);
      this.invoice.nettoValue = +this.roundNetto2Value;

      this.roundBrutto2Value = this.invoice.bruttoValue.toFixed(2);
      this.invoice.bruttoValue = +this.roundBrutto2Value;


      this.CountAll();


    }

  }

  CountAll(): void{


      this.sumVatValue = this.sum1VatValue;
      this.sumNettoValue = this.sum1NettoValue;
      this.sumBruttoValue = this.sum1BruttoValue;


      this.dataArray.forEach(value => {
      this.sum1VatValue = this.sumVatValue + value.vatValue;
      this.roundVatValue = this.sum1VatValue.toFixed(2);
      this.sumVatValue = +this.roundVatValue;
      this.sum1VatValue = 0;

      this.sum1NettoValue = this.sumNettoValue + value.nettoValue;
      this.roundNettoValue = this.sum1NettoValue.toFixed(2);
      this.sumNettoValue = +this.roundNettoValue;
      this.sum1NettoValue = 0;

      this.sum1BruttoValue = this.sumBruttoValue + value.bruttoValue;
      this.roundBruttoValue = this.sum1BruttoValue.toFixed(2);
      this.sumBruttoValue = +this.roundBruttoValue;
      this.sum1BruttoValue = 0;

    });
      this.value = this.sumBruttoValue.toString();

  }

  GetBusinessByNip(): void{



  }



  SaveInvoice(): void {

    this.dataArray.forEach(value2 => {
      console.log(value2.id);
      console.log(value2.id);
      console.log(value2.id);
      console.log(value2.id);
      const productBasket: ProductBasket = ({

        idProduct: value2.id,
        vatRate: value2.rateVat,
         cod: value2.cod,
        numberOfItems: value2.quantity,
        nameOfProduct: value2.nameProduct,
        discount: value2.discount,
        vatValue: value2.vatValue,
        lp: value2.lp,
        unit: value2.unit,
        nettoPrice: value2.nettoPrice,
        bruttoValue: value2.bruttoValue,
        nettoValue: value2.nettoValue,

      });
      this.productBaskets.push(productBasket);
    });

    console.log(this.invoiceObject);
    this.orderService.AddOneInvoice(this.invoiceObject).subscribe();
  }


  SetBusinnessDataInFormInvoice(): void {
      this.businesses.forEach(business => {
       if (business.name === this.invoiceObject.buyer){
           this.invoiceObject.business = business;
       }
    });
  }
}
