import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {DataserviceService} from '../../../../dataservice.service';
import {InvoiceInterface} from '../../../../product-service.service';
import {Company, CompanyServiceService} from '../../../../company-service.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import * as html2pdf from 'html2pdf.js';
import {type} from 'os';
import {ActivatedRoute} from '@angular/router';
import {InvoiceService} from '../../../../invoice.service';

@Component({
  selector: 'app-ready-invoice',
  templateUrl: './ready-invoice.component.html',
  styleUrls: ['./ready-invoice.component.css']
})
export class ReadyInvoiceComponent implements OnInit {

  id1: number;
  nip1: string;
  buyer1: string;
  recipient1: string;
  account1: string;
  payForm1: string;
  date1: string;
  paid1: string;
  spendFromStock1: string;
  phoneNumber1: string;
  address1: string;
  sumVatValue1: number;
  sumNettoValue1: number;
  sumBruttoValue1: number;
  dataarray = [];
  company: Array<Company>;
  paymentDeadline1: string;
  id: any;
  sub: any;





  constructor(private invoiceService: InvoiceService, private dataserviceService: DataserviceService, private companyServiceService: CompanyServiceService, private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.sub = this.route.params.subscribe(value => {
      this.id = value.id;
    });

    this.invoiceService.GetInvoiceById(this.id).subscribe(value => {
      this.buyer1 = value.businnesName;
      this.nip1 = value.nip;
      this.recipient1 = value.recipient;
      // this.account1 = value.ac;
      this.payForm1 = value.payForm;
      this.date1 = value.date;
      this.paid1 = value.paid;
      this.spendFromStock1 = value.spendFromStock;
      this.sumVatValue1 = +value.sumVatValue;
      this.sumNettoValue1 = +value.sumNettoValue;
      this.sumBruttoValue1 = +value.sumBruttoValue;
      // this.phoneNumber1 = value.phoneNumber;
      // this.address1 = value.a;
      // this.dataarray = value.productBaskets;
      this.paymentDeadline1 = value.paymentDeadline;

    });

  }

  clicks() {
    const options = {
      filename: 'we',
      image: {type: 'png'},
      html2canvas: {},
      jsPDF: {orientation: 'landscape'}
    };
    const data: Element = document.getElementById('tableToPdf');

    html2pdf().from(data).set(options).save();

  }


}
