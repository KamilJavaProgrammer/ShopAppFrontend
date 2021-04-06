import {Injectable} from '@angular/core';
import {ReplaySubject, Subject} from 'rxjs';
import {Client, InvoiceInterface, Product} from './product-service.service';


@Injectable({
  providedIn: 'root'
})
export class DataserviceService{

  constructor() {}

  p1 = new Subject<Product>();
  date = this.p1.asObservable();

  p2 = new Subject<InvoiceInterface>();
  dates = this.p2.asObservable();






  addData(value: Product) {
    this.p1.next(value);
  }
  addDatesInvoice(value: InvoiceInterface) {
    this.p2.next(value);
  }



}

