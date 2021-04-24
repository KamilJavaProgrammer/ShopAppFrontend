import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, throwError} from 'rxjs';
import {Client, Product} from './product-service.service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ServiceClient, ShopClient} from './client-service.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  table: Array<ProductBasket> = [];
  check: boolean;
  headers: HttpHeaders;

  port = '8088';
  urlOrders = 'http://localhost:' + this.port + '/order';
  urlInvoice = 'http://localhost:' + this.port + '/invoice';
  urlParcel = 'http://localhost:' + this.port + '/products/parcel';
  urlRepairOrder = 'http://localhost:' + this.port + '/order/repair';

  constructor(private httpClient: HttpClient) {}

  GetAllOrdersForUser(): Observable<Array<CompleteOrder>>{

    this.headers = new HttpHeaders();
    this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('accessToken')}`);
    return this.httpClient.get<any>(this.urlOrders, {headers: this.headers, observe: 'response'})
      .pipe(map(response => {
        if (response.status === 200){
          return response.body.body;
        }
        else {
          throwError('Fault');
        }
      }));
  }









  SendCompleteOrderToServerNoRegister(completeOrder: any): Observable<HttpResponse<any>>{
    this.headers = new HttpHeaders();
    // this.headers = this.headers.append('Authorization', `Bearer ${sessionStorage.getItem('tokenJwt')}`);
    // this.headers = this.headers.append('Content-Type', 'application/json');
    return this.httpClient.post<HttpResponse<any>>(this.urlOrders, completeOrder, {headers: this.headers});
  }




  GetAllOrders(): Observable<Array<CompleteOrder>>{

    this.headers = new HttpHeaders();
    // this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    return this.httpClient.get<any>(this.urlOrders + '/all', {observe: 'response'} ).pipe(map(value => {

       return value.body;

    }));
  }

    GetInvoiceByUserId(id: number): Observable<Blob>{
      this.headers = new HttpHeaders();
      this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
      return this.httpClient.get(this.urlInvoice + '/' + id, {responseType: 'blob'});
    }




  CheckExistsOrder(product: Product, callback): void {

    callback(this.table.some(el => el.nameOfProduct === product.productName));
  }

  GetNumberOfItemsFromOrderCallback(product: Product, callback): void {
           callback(this.GetNumberOfItemsFromOrder(product));
  }


  GetNumberOfItemsFromOrder(product: Product): number {

     let result;
     this.table.forEach(value => {
        if (value.nameOfProduct === product.productName)
        {
          result =   value.numberOfItems;
        }

      });
     return result;
  }



  CheckOrderTable(order: ProductBasket, callback): void {

    callback(this.table.some(el => el.nameOfProduct === order.nameOfProduct));

  }


  AddOrder(order: ProductBasket): void {

    this.CheckOrderTable(order, result => {

      this.check = result;
    });

    if (this.check === false) {
        this.table.push(order);
        sessionStorage.setItem('tableOrders', JSON.stringify(this.table));
       }

    else {

      this.table.forEach(value => {
        if (value.nameOfProduct === order.nameOfProduct) {
          value.numberOfItems++;
          sessionStorage.setItem('tableOrders', JSON.stringify(this.table));

        }
      });

    }
  }

  GetParcelData(): Observable<Product> {

    return this.httpClient.get<any>(this.urlParcel, {observe: 'response'}).pipe(map(value => {
      return value.body.body;
    }));

  }

  SendRepairOrder(formData: any, repairOrder: RepairOrder): Observable<any> {

    return this.httpClient.post<any>(this.urlRepairOrder, {formData, repairOrder}, {observe: 'response'}).pipe(map(value => {
      return value.body.body;
    }));

  }
}





export interface CompleteOrder {
  id?: number;
  deliveryOption?: string;
  paymentMethod?: string;
  date?: string;
  state?: string;
  invoice?: boolean;
  sumPaid?: number;
  shopclient?: ShopClient;
  address?: Address;
  productsBasket?: Array<ProductBasket>;
  token?: boolean;
}












export interface ProductBasket {
  id?: number;
  idProduct?: number;
  image?: any;
  nameOfProduct?: string;
  bruttoPrice?: number;
  numberOfItems?: number;
  nettoPrice?: number;
  discount?: number;
  vatRate?: number;
  unit?: number;


}

export interface Address {

  id?: number;
  placeOfresident?: string;
  town?: string;
  postCode?: string;
  type?: string;

}
export interface Business{

  id?: number;
  name?: string;
  nip?: string;
  regon?: string;
  account?: string;
  email?: string;
  phoneNumber?: string;
  address?: Address;
}

export interface RepairOrder {
  id?: number;
  serviceClient?: ServiceClient;
  description?: string;
  pathToFile?: string;

}

