import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {


  constructor(private httpClient: HttpClient) { }

  url = 'http://localhost:8088/invoice/';


  public GetInvoiceById(id: number): Observable<InvoiceDTO>{

    return this.httpClient.get<InvoiceDTO>(this.url + id);
  }
}


export interface InvoiceDTO {

  id?: number;
  recipient?: string;
  payForm?: string;
  date?: string;
  paid?: string;
  spendFromStock?: string;
  paymentDeadline?: string;
  sumVatValue?: string;
  sumNettoValue?: string;
  sumBruttoValue?: string;
  businnesName?: string;
  nip?: string;


}


