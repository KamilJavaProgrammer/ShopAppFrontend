import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Client} from './product-service.service';
import {Business, CompleteOrder} from './order.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {AuthService} from './auth.service';
import {Role} from '../Enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class ClientServiceService {

  constructor(private httpClient: HttpClient, private authService: AuthService){}

  urlClientService = AuthService.ADDRESS_SERVER + '/shopClients';
  urlBusiness =  AuthService.ADDRESS_SERVER + '/businesses';


  public GetAllBusiness(role: Role): Observable<Array<Business>>{

    return this.httpClient.get<any>(this.urlBusiness, {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'} )
      .pipe(map(response => {
      return response.body;
    }));

  }

   public GetAllShopClients(role: Role): Observable<Array<ShopClient>>{

     return this.httpClient.get<any>(this.urlClientService + '/all', {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
       .pipe(map(response => {
       return response.body;
     }));

   }

  public GetOneClientById(id: number, role: Role): Observable<any>{

    return this.httpClient.get<any>(this.urlClientService + '/' + id, {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(response => {
      return response.body;
    }));

  }
  EditShopClient(event: ShopClient, id: any, role: Role): Observable<any> {
    return this.httpClient.patch<any>(this.urlClientService + '/' + id , event, {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(response => {
      return response.body;
    }));
  }


  public AddClient(shopClient: ShopClient, role: Role): Observable<any>{

    return this.httpClient.post<any>(this.urlClientService, shopClient, {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(response => {
      return response.body;
    }));

  }

  DeleteClients(clients: Array<ShopClient>): Observable<any>{
    return this.httpClient.request('delete', this.urlClientService, {body: clients, headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(response => {
      }));

  }

  DeleteShopClientById(id: number): Observable<any> {
    return this.httpClient.delete<any>(this.urlClientService + '/' + id, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE), observe: 'response'});
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
export interface ServiceClient extends Client{
  deviceList?: Array<Device>;
}
export interface Device {
   id?: number;
   name?: string;
   type?: string;
   manufacturer?: string;
   model?: string;
   serialNumber?: string;

}

