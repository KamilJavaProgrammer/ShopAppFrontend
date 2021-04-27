import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Client, InvoiceInterface, Product, ProductServiceService} from '../../../../product-service.service';
import {Invoice} from '../../../../invoice.model';
import {all} from 'codelyzer/util/function';
import {DataserviceService} from '../../../../dataservice.service';
import {ClientServiceService, ShopClient} from '../../../../client-service.service';
import {Business} from '../../../../order.service';

@Component({
  selector: 'app-fvform',
  templateUrl: './fvform.component.html',
  styleUrls: ['./fvform.component.css']
})
export class FVformComponent implements OnInit {

  products: Array<Product>;
  invoice = new Invoice();
  dataarray = [];
  search: string;
  i = 2;
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


  account: string;
  recipient: string;
  nip: string;
  buyer: string;
  client: Client;
  businesses: Array<Business> = [];

  client1: Client;
  date: any;

  invoiceObject: InvoiceInterface;
  spendFromStock: string;
  paid: string;
  payForm: string;

  address: string;
  phoneNumber: string;
  paymentDeadline: string;






  constructor(private dataserviceService: DataserviceService , private productService: ProductServiceService,
              private clientService: ClientServiceService) {
  }

  public ngOnInit(): void {

    this.GetAllBusiness();
    this.GetAllProduct();
    this.date = new Date().toLocaleDateString();
    this.invoice.lp = 1;
    this.invoice.unit = 'szt';
    this.invoice.rateVat = '23%';
    this.invoice.cod = 'F16';
    this.invoice.discount = 0.00;
    this.dataarray.push(this.invoice);
    this.spendFromStock = 'Główny magazyn';



    this.sumBruttoValue = +this.value1;



  }

  AddProductRow(): void {
    this.invoice = new Invoice();
    this.invoice.lp = this.i++;
    this.invoice.unit = 'szt';
    this.invoice.rateVat = '23%';
    this.invoice.cod = 'F16';
    this.invoice.discount = 0.00;
    this.dataarray.push(this.invoice);
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
      this.invoice.quantity = 1;
      this.invoice.nameProduct = this.products[index].productName;
      this.search = '';
      this.invoice.cod = this.products[index].cod;
      this.invoice.nettoPrice = +(+this.products[index].productPrice / 1.23).toFixed(2);
      this.Oblicz();
    }
  }






  Remove(index): void {

    this.dataarray.splice(index);
    this.i--;
    this.Wylicz();
  }



  Oblicz(): void {

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


      this.Wylicz();


    }

  }

  Wylicz(): void{


      this.sumVatValue = this.sum1VatValue;
      this.sumNettoValue = this.sum1NettoValue;
      this.sumBruttoValue = this.sum1BruttoValue;


      this.dataarray.forEach(value => {
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
    this.GetBusinessByNip();

    this.invoiceObject = ({
      account : this.account,
      buyer: this.buyer,
      date : this.date,
      nip : this.nip,
      recipient: this.recipient,
      sumVatValue: this.sumVatValue,
      sumBruttoValue: this.sumBruttoValue,
      sumNettoValue: this.sumNettoValue,
      spendFromStock: this.spendFromStock,
      paid: this.paid,
      payForm: this.payForm,
      rest : this.dataarray,
      address: this.address,
      phoneNumber: this.phoneNumber,
      paymentDeadline: this.paymentDeadline


    });




    this.productService.AddInvoice(this.invoiceObject).subscribe(value2 => {this.dataserviceService.addDatesInvoice(value2); });
    this.dataarray.forEach(value2 => {console.log(value2.nameProduct); });

  }


}
