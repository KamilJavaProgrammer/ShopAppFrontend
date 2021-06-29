import { Injectable } from '@angular/core';
import {Observable, ReplaySubject, throwError} from 'rxjs';
import {Client, InvoiceInterface, Product} from './product-service.service';
import {HttpClient, HttpHeaders, HttpResponse} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {ServiceClient, ShopClient} from './client-service.service';
import {AuthService} from './auth.service';
import {Role} from '../Enums/role.enum';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  table: Array<ProductBasket> = [];
  check: boolean;

  urlOrders = AuthService.ADDRESS_SERVER + '/orders';
  urlInvoice = AuthService.ADDRESS_SERVER + '/invoices';
  urlParcel = AuthService.ADDRESS_SERVER + '/products/parcel';



  constructor(private httpClient: HttpClient, private authService: AuthService) {}


  AddOneInvoice(invoiceObject: InvoiceInterface, role: Role): Observable<any>{

    return this.httpClient.post<any>(this.urlInvoice, invoiceObject, {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(response => {
        if (response.status === 200){
          return response.body;
        }
        else {
          throwError('Fault');
        }
      }));
  }

  GetAllOrdersForUser(role: Role): Observable<Array<CompleteOrder>>{


    return this.httpClient.get<any>(this.urlOrders, {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(response => {
        if (response.status === 200){
          return response.body;
        }
        else {
          throwError('Fault');
        }
      }));
  }


  SendCompleteOrderToServer(completeOrder: CompleteOrder): Observable<any>{
    return this.httpClient.post<any>(this.urlOrders, completeOrder);
  }


  GetAllOrders(role: Role): Observable<Array<CompleteOrder>>{

    return this.httpClient.get<any>(this.urlOrders + '/all', {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'} )
      .pipe(map(response => {
        if (response.status === 200){
          return response.body;
        }
        else {
          throwError('Fault');
        }
      }));
  }

    GetInvoiceByUserId(id: number, role: Role): Observable<Blob>{

      return this.httpClient.get(this.urlInvoice + '/' + id, {responseType: 'blob', headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE)});
    }


    CheckExistsOrder(product: Product, callback): void {

    callback(this.table.some(el => el.nameOfProduct === product.productName));
  }

  GetNumberOfItemsFromOrderCallback(product: Product, callback): void {
           callback(this.GetNumberOfItemsFromOrder(product));
  }


  GetNumberOfItemsFromOrder(product: Product): number {

     let result = 0;
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



  DeleteOrder(productBasket: ProductBasket): void {

    this.CheckOrderTable(productBasket, result => {

      this.check = result;
    });

    if (this.check === false) {

    }

    else {
      this.table.forEach((value, index) => {
        if (value.nameOfProduct === productBasket.nameOfProduct) {
          this.table.splice(index, 1);
          sessionStorage.setItem('tableOrders', JSON.stringify(this.table));
        }

      });
    }
  }


  AddOrder(productBasket: ProductBasket): void {

    this.CheckOrderTable(productBasket, result => {

      this.check = result;
    });

    if (this.check === false) {
        this.table.push(productBasket);
        sessionStorage.setItem('tableOrders', JSON.stringify(this.table));
       }

    else {

      this.table.forEach(value => {
        if (value.nameOfProduct === productBasket.nameOfProduct) {
          value.numberOfItems++;
          sessionStorage.setItem('tableOrders', JSON.stringify(this.table));

        }
      });

    }
  }

  GetParcelData(): Observable<Product> {

    return this.httpClient.get<any>(this.urlParcel, {observe: 'response'}).pipe(map(value => {
      return value.body;
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
  token?: string;
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
  vatRate?: string;
  unit?: number;

  cod?: string;
  lp?: number;
  nettoValue?: number;
  vatValue?: number;
  bruttoValue?: number;

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


