import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Address, Business, ProductBasket} from './order.service';
import {map} from 'rxjs/operators';
import {SortOption} from '../Enums/sort-option.enum';
import {Role} from '../Enums/role.enum';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ProductServiceService {

  urlProdctName = AuthService.ADDRESS_SERVER + '/products/name';
  path = AuthService.ADDRESS_SERVER + '/image/';
  url = AuthService.ADDRESS_SERVER + '/products';
  urlExport = AuthService.ADDRESS_SERVER + '/export';
  url123 = AuthService.ADDRESS_SERVER + '/products/parts';
  urlSubCatgory = AuthService.ADDRESS_SERVER + '/subcategories';
  urlCategoryProduct = AuthService.ADDRESS_SERVER + '/categories';
  urlClient = AuthService.ADDRESS_SERVER + '/client';
  urlClient1 = AuthService.ADDRESS_SERVER + '/client1';
  urlInvoice = AuthService.ADDRESS_SERVER + '/invoice';


  constructor(private httpClient: HttpClient, private authService: AuthService) {}



  GetImageByPathFromService(pathImage: string): Observable<any> {
    return this.httpClient.get( this.path + pathImage, {responseType: 'blob'});
  }



  GetAllProducts(role: Role): Observable<Array<Product>>{

    return this.httpClient.get<any>(this.url + '/all', { headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(response => {
        if (response.status === 200)
        {
          return response.body;
        }
      }));
  }

  GetAllProductsParts(wareHousePlace: string, role: Role): Observable<Array<Product>>{

    return this.httpClient.get<any>(this.url123 + '?place=' + wareHousePlace,  {headers: this.authService.SetJWTToken(role, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(response => {

         if (response.status === 200){
           return response.body;
         }
      }));
  }


  GetProductsCurrentItem(id: number, name: string, minPrice: number, maxPrice: number, index?: number): Observable<Map<number, Array<Product>>>{

    let url = '';
    if (index === undefined)
    {
      url = this.urlProdctName + '/' + id + '?name=' + name + '&minPrice=' + minPrice  + '&maxPrice=' + maxPrice;
    }
    else
    {
      url   = this.urlProdctName + '/' + id + '?name=' + name + '&minPrice=' + minPrice  + '&maxPrice=' + maxPrice  + '&sort=' + SortOption[index];
    }

    return this.httpClient.get<any>(url , {observe: 'response'}).pipe(map(value => {
        if (value.status === 200){
          return value.body;
        }
      }));

  }


  GetAllProductCategories(): Observable<Map<Map<string, number>, Map<string, number>>>{
    return this.httpClient.get<any>(this.urlCategoryProduct, {observe: 'response'}).pipe(map(value => {
         return value.body;
    }));
  }

  GetAllSubCategories(): Observable<Array<string>>{
    return this.httpClient.get<Array<string>>(this.urlSubCatgory);
  }


  AddProduct(formData: any): Observable<any> {
    return this.httpClient.post(this.url, formData, { headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }



  EditProduct(formData: any, productId: number): Observable<any> {

     return this.httpClient.patch(this.url + '/' + productId, formData, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});

  }

  ExportProduct(products: Array<Product>, routeExport: string): Observable<any>{
    return this.httpClient.post<any>(this.urlExport + '?route=' + routeExport , products, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(value => {
        if (value.status === 200)
        {
          return value.body;
        }
      }));
  }


  DeleteProducts(products: Array<Product>): Observable<any>{
    return this.httpClient.request('delete', this.url, {body: products, headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE), observe : 'response'});
  }


  GetOneProduct(id: number): Observable<Product>{
    return this.httpClient.get<Product>(this.url + '/' + id);
  }

  DeleteProduct(id: number): Observable<any> {
    return this.httpClient.delete<any>(AuthService.ADDRESS_SERVER + '/products/' + id, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }


  PutProduct(id: number, product: Product): Observable<Product>{
    return this.httpClient.put(AuthService.ADDRESS_SERVER + '/products/' + id, product, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }
  PatchProduct(id: number, product: Product): Observable<Product>{
    return this.httpClient.patch(AuthService.ADDRESS_SERVER + '/products/' + id, product, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }


  GetAllClients(): Observable<Array<Client>>{
    return this.httpClient.get<any>(this.urlClient, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(response => {
        if (response.status === 200)
        {
          return response.body;
        }
      }));
  }

  GetOneClient(id: number): Observable<Client>{
    return this.httpClient.get<Client>(this.urlClient + '/' + id,  {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }
  PostOneClientByName(client: Client): Observable<Client>{
    return this.httpClient.post<Client>(this.urlClient1, client, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }
  AddClient(client: Client): Observable<Client>{
    return this.httpClient.post(this.urlClient, client, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }
  DeleteClient(id: number): Observable<Client>{
    return this.httpClient.delete(this.urlClient + '/' + id, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }
  PatchClient(id: number, client: Client): Observable<Client>{
    return this.httpClient.patch(this.urlClient + '/' + id, client, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }



  AddInvoice(invoice: InvoiceInterface): Observable<InvoiceInterface>{
    return this.httpClient.post(this.urlInvoice, invoice, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }
  GetAllInvoices(): Observable<Array<InvoiceInterface>>{
    return this.httpClient.get<Array<InvoiceInterface>>(this.urlInvoice, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }
  GetOneInvoice(id: number): Observable<InvoiceInterface>{
    return this.httpClient.get<InvoiceInterface>(this.urlInvoice + '/' + id, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
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
   weight?: string;
  imageByte?: any;
  state?: any;

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
  invoicePath?: string;
  recipient?: string;
  account?: string;
  payForm?: string;
  date?: string;
  paid?: string;
  spendFromStock?: string;
  sumVatValue?: number;
  sumNettoValue?: number;
  sumBruttoValue?: number;
  paymentDeadline?: string;
  productBaskets?: Array<ProductBasket>;
  business?: Business;





}


