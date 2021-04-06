import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Client, Product} from './product-service.service';
import {Address, Business, CompleteOrder} from './order.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private httpClient: HttpClient ){}

  port = '8088';
  urlClientService = 'http://localhost:' + this.port + '/client/service';

  httpHeaders: HttpHeaders;


   public GetAllShopClients(): Observable<any>{

     this.httpHeaders = new HttpHeaders();
     return this.httpClient.get<any>(this.urlClientService, {observe: 'response'}).pipe(map(value => {
       console.log(value.body.body);
       return value.body.body;
     }));

   }

  public GetOneClientById(id: number): Observable<any>{

    this.httpHeaders = new HttpHeaders();
    return this.httpClient.get<any>(this.urlClientService + '/' + id, {observe: 'response'}).pipe(map(value => {
      console.log(value.body.body);
      return value.body.body;
    }));

  }
  EditShopClient(event: ShopClient, id: any): Observable<any> {
    this.httpHeaders = new HttpHeaders();
    return this.httpClient.patch<any>(this.urlClientService + '/' + id , event,{observe: 'response'}).pipe(map(value => {
      console.log(value.body.body);
      return value.body.body;
    }));
  }







  public AddClient(shopClient: ShopClient): Observable<any>{

    this.httpHeaders = new HttpHeaders();
    return this.httpClient.post<any>(this.urlClientService, shopClient, {observe: 'response'}).pipe(map(value => {
      console.log(value.body.body);
      return value.body.body;
    }));

  }

  DeleteClients(clients: Array<ShopClient>): Observable<any>{
    return this.httpClient.request('delete', this.urlClientService, {body: clients, observe: 'response'})
      .pipe(map(value => {
        console.log(value);
      }));

  }

  DeleteShopClientById(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.urlClientService + '/' + id, {observe: 'response'});
  }

  compareName(a: Client, b: Client): number {
    return a.name.localeCompare(b.name);
  }

  Search(event: any): void {
    const spanItems = document.querySelectorAll('.tr-data');
    const searchItem = event.target.value.toLowerCase();

    spanItems.forEach(value => {
      if (value.textContent.toLowerCase().indexOf(searchItem) !== -1) {

        value.closest<HTMLElement>('.tr-data').style.display = '';

      } else {
        value.closest<HTMLElement>('.tr-data').style.display = 'none';
      }

    });

  }

  public GeneratePdf(): void
  {
    const data = document.getElementById('table');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Klienci.pdf'); // Generated PDF
    });
  }



}

export interface ShopClient extends Client{
  state?: string;
  email?: string;
  completeOrder?: Array<CompleteOrder>;
}
