import {Component, ElementRef, OnInit, Renderer2} from '@angular/core';
import {Client, InvoiceInterface, Product, ProductServiceService} from '../../../../product-service.service';
import {FormArray, FormControl, Validators} from '@angular/forms';
import { FormGroup} from '@angular/forms';
import { FormBuilder} from '@angular/forms';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';
import {Invoice} from '../../../../invoice.model';
import {all} from 'codelyzer/util/function';
import {DataserviceService} from '../../../../dataservice.service';

@Component({
  selector: 'app-fvform',
  templateUrl: './fvform.component.html',
  styleUrls: ['./fvform.component.css']
})
export class FVformComponent implements OnInit {

  products: Array<Product>;
  products1: Array<Product>;
  products2: Array<Product>;
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
  searchArray: Array<string>;
  searchArray1: Array<string>;

  valueArray: number;

  roundVat2Value: string;
  roundNetto2Value: string;
  roundBrutto2Value: string;

  searching: number;

  account: string;
  recipient: string;
  nip: string;
  buyer: string;
  client: Client;
  clients: Array<Client>;

  client1: Client;
  date: any;

  invoiceObject: InvoiceInterface;
  spendFromStock: string;
  paid: string;
  payForm: string;

  dataarray3: string[];
  address: string;
  phoneNumber: string;
  paymentDeadline: string;
 name4: string;






  constructor(private dataserviceService: DataserviceService , private fb: FormBuilder, private productServiceService: ProductServiceService, private renderer2: Renderer2, private elementRef: ElementRef) {
  }

  public ngOnInit(): void {

    this.GetAllClients();
    this.GetAllProduct();
    this.date = new Date().toLocaleDateString();
    this.invoice.lp = 1;
    this.invoice.unit = 'szt';
    this.invoice.rateVat = '23%';
    this.invoice.cod = 'F16';
    this.invoice.discount = 0.00;
    this.dataarray.push(this.invoice);



    this.sumBruttoValue = +this.value1;



  }

  Add() {
    this.invoice = new Invoice();
    this.invoice.lp = this.i++;
    this.invoice.unit = 'szt';
    this.invoice.rateVat = '23%';
    this.invoice.cod = 'F16';
    this.invoice.discount = 0.00;
    this.dataarray.push(this.invoice);
  }

  GetAllProduct() {
    this.productServiceService.GetAllProduct().subscribe(p => {
      this.products = p;
    });
  }

  GetAllClients() {
    this.productServiceService.GetAllClients().subscribe(p => {
      this.clients = p;
    });
  }


  AddSearch() {


    this.searchArray = this.search.split('-');
    this.searchArray1 = this.searchArray[1].split('-');
    this.valueArray = +this.searchArray1;


    if (this.valueArray < 1){
      alert('Masz za mało produktów');
      this.search = '';
    }
    else
    {
      this.invoice.quantity = 1;
      this.invoice.nameProduct = this.searchArray[0];
      this.searching = +this.searchArray[3];
      this.productServiceService.GetOneProduct(this.searching).subscribe(p => {this.invoice.cod = p.status;
                                                                               this.invoice.id = p.id; });
      this.search = '';

    }



  }






  Remove(index) {

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

  Send(): void{

    this.client = ({
      // account: this.account,
      // buyer: this.buyer,
      // recipient: this.recipient,
      // nip: this.nip,
      phoneNumber: this.phoneNumber,
      // address: this.address


    });


    this.productServiceService.AddClient(this.client).subscribe(value2 => {console.log(value2); });

  }


  AddCliente() {


    this.client1 = ({
      // buyer: this.buyer
    });



    this.productServiceService.PostOneClientByName(this.client1).subscribe(value2 => {console.log(value2);

                                                                                      this.nip = value2[0].nip;
                                                                                      this.account = value2[0].account;
                                                                                      this.address = value2[0].address;
                                                                                      this.phoneNumber = value2[0].phoneNumber;


                                                                                       });

  }

  SaveInvoice() {
    this.Send();

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




    this.productServiceService.AddInvoice(this.invoiceObject).subscribe(value2 => {this.dataserviceService.addDatesInvoice(value2); });
    this.dataarray.forEach(value2 => {console.log(value2.nameProduct); });

  }
}
