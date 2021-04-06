import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {InvoiceInterface} from './product-service.service';
import {compareNumbers} from '@angular/compiler-cli/src/diagnostics/typescript_version';

@Injectable({
  providedIn: 'root'
})
export class CompanyServiceService {
  url = 'http://localhost:8089/company';

  constructor(private httpClient: HttpClient) {
  }


  AddCompany(company: Company): Observable<Company> {
    return this.httpClient.post(this.url , company);
  }

  GetAllCompanies(): Observable<Array<Company>> {
    return this.httpClient.get<Array<Company>>(this.url);
  }

  GetOneCompany(id: number): Observable<Company> {
    return this.httpClient.get<Company>(this.url + '/' + id);
  }
}


export interface Company {
  id?: number;
   nameOfCompany?: string;
   adressOfCompany?: string;
   nip?: string;
   phoneNumber?: string;


}

