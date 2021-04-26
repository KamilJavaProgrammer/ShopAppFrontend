import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Address, Business} from './order.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {


  port = '8088';

  urlProdctName = 'http://localhost:' + this.port + '/products/name';
  path = 'http://localhost:' + this.port + '/image';
  url = 'http://localhost:' + this.port + '/products';
  urlExport = 'http://localhost:' + this.port + '/export';
  url123 = 'http://localhost:' + this.port + '/products/parts';
  urlList = 'http://localhost:' + this.port + '/products/list';
  urlCategoryProduct = 'http://localhost:' + this.port + '/subcategory';
  urlManufacturers = 'http://localhost:' + this.port + '/manufacturers';
  urlClient = 'http://localhost:' + this.port + '/client';
  urlClient1 = 'http://localhost:' + this.port + '/client1';
  urlInvoice = 'http://localhost:' + this.port + '/invoice';


  httpOptions: any;
  headers: any;
  sub: any;
  id: number;



  constructor(private httpClient: HttpClient) {

  }
  getImageFromService(product: Product): Observable<any> {
    const pathImage  = product.pathToFile.replace('C:/ZdjęciaBaza/Upload', '');
    return this.httpClient.get(this.path + pathImage, {responseType: 'blob'});

  }

  GetAllProducts(): Observable<Array<Product>>{
    return this.httpClient.get<any>(this.url + '/all', {observe: 'response'})
      .pipe(map(value => {
        if (value.body.statusCodeValue === 200)
        {
          return value.body.body;
        }
      }));
  }

  GetAllProductsParts(warehouseplace: string): Observable<Array<Product>>{
    return this.httpClient.get<any>(this.url123 + '?place=' + warehouseplace,  {observe: 'response'})
      .pipe(map(value => {
        if (value.body.statusCodeValue === 200)
        {
              return value.body.body;
        }
      }));
  }

  GetProducts(formData: FormData): Observable<Array<Product>>{


    this. headers = new HttpHeaders();
    // this.headers = this. headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    return this.httpClient.post<any>(this.urlProdctName, formData, {headers: this.headers, observe: 'response'}).pipe(map(value => {
       if (value.status === 200){
         return value.body.body;
       }
    }));
  }

  GetListAllCategories(): Observable<Array<string>>{
    return this.httpClient.get<Array<string>>(this.urlCategoryProduct);
  }





  GetCategories(formData: FormData): Observable<Map<string, number>>{
    return this.httpClient.post<Map<string, number>>(this.urlCategoryProduct, formData);
  }

  GetAllSubCategories(): Observable<Array<string>>{
    return this.httpClient.get<Array<string>>(this.urlCategoryProduct);
  }

   AddProduct(formData: FormData): Observable<string> {
      this.headers = new HttpHeaders();

     // this.headers = this.headers.append('Content-Type', 'multipart/form-data');
     // this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
      return this.httpClient.post(this.url, formData, {responseType: 'text', headers: this.headers});
  }
  EditProduct(formData: FormData, id: number): Observable<any> {
    this.headers = new HttpHeaders();

    // this.headers = this.headers.append('Content-Type', 'multipart/form-data');
    // this.headers = this.headers.append('Authorization', `Bearer ${localStorage.getItem('accessToken')}`);
    return this.httpClient.patch(this.url + '/' + this.id , formData, {observe: 'response'});
  }

  ExportProduct(products: Array<Product>, routeExport: string): Observable<any>{
    return this.httpClient.post<any>(this.urlExport + '?route=' + routeExport , products, {observe: 'response'})
      .pipe(map(value => {
        if (value.body.statusCodeValue === 200)
        {
          return value.body.body;
        }
      }));
  }



  GetPhotos(path: string): Observable<Blob>{
    return this.httpClient.get(path, {responseType: 'blob'});

  }



  DeleteProducts(products: Array<Product>): Observable<any>{
    return this.httpClient.request('delete', this.url, {body: products, observe: 'response'})
      .pipe(map(value => {
             console.log(value);
      }));

  }


  GetManufacturersBySubCategoryFromServer(formData: FormData): Observable<Map<string, number>>{
     return this.httpClient.post<Map<string, number>>(this.urlManufacturers, formData);
  }


  GetAllSearchingProduct(searchText: string): Observable<Array<Product>>{
    return this.httpClient.get<any>(this.url + '/search?searchText=' + searchText, {observe: 'response'}).pipe(map(value => {
       if (value.status === 200)
       {
         console.log(value);
         return value.body.body;
       }
    }));
  }



  GetOneProduct(id: number): Observable<Product>{
    return this.httpClient.get<Product>(this.url + '/' + id);
  }

  DeleteProduct(id: number): Observable<any>{
    return this.httpClient.delete<any>('http://localhost:8088/products/' + id).pipe(map(value => {
      console.log(value);
    }));
  }
  PutProduct(id: number, product: Product): Observable<Product>{
    return this.httpClient.put('http://localhost:8088/products/' + id, product);
  }
  PatchProduct(id: number, product: Product): Observable<Product>{
    return this.httpClient.patch('http://localhost:8088/products/' + id, product);
  }
  GetCount(): Observable<number>{
    return this.httpClient.get<number>('http://localhost:8088/quantity');
  }


  GetAllClients(): Observable<Array<Client>>{
    return this.httpClient.get<Array<Client>>(this.urlClient);
  }

  GetOneClient(id: number): Observable<Client>{
    return this.httpClient.get<Client>(this.urlClient + '/' + id);
  }
  PostOneClientByName(client: Client): Observable<Client>{
    return this.httpClient.post<Client>(this.urlClient1, client);
  }
  AddClient(client: Client): Observable<Client>{
    return this.httpClient.post(this.urlClient, client);
  }
  DeleteClient(id: number): Observable<Client>{
    return this.httpClient.delete(this.urlClient + '/' + id);
  }
  PatchClient(id: number, client: Client): Observable<Client>{
    return this.httpClient.patch(this.urlClient + '/' + id, client);
  }
  ////
  ///


  AddInvoice(invoice: InvoiceInterface): Observable<InvoiceInterface>{
    return this.httpClient.post(this.urlInvoice, invoice);
  }
  GetAllInvoices(): Observable<Array<InvoiceInterface>>{
    return this.httpClient.get<Array<InvoiceInterface>>(this.urlInvoice);
  }
  GetOneInvoice(id: number): Observable<InvoiceInterface>{
    return this.httpClient.get<InvoiceInterface>(this.urlInvoice + '/' + id );
  }
}





export interface Product {
  id?: number;
  date?: string;
  productCategory?: string;
  productSubCategory?: string;
  productName?: string;
  manufacturer?: string;
  serialNumber?: string;
  model?: string;
  productPrice?: string;
  pathToFile?: string;
  numberOfItems?: string;
  location?: string;
  cod?: string;
  status?: string;
  description?: string;
  wareHouseplace?: string;

  imageByte?: any;

}



export interface Client {

  id?: number;
  name?: string;
  surname?: string;
  phoneNumber?: string;
  state?: string;
  email?: string;
  business?: Business;
  address?: Address;

}





export interface InvoiceInterface {

  id?: number;
  nip?: string;
  buyer?: string;
  recipient?: string;
  account?: string;
  payForm?: string;
  date?: string;
  paid?: string;
  spendFromStock?: string;
  sumVatValue?: number;
  sumNettoValue?: number;
  sumBruttoValue?: number;
  rest?: any[];
  address?: string;
  phoneNumber?: string;
  paymentDeadline?: string;




}


