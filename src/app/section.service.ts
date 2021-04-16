import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  httpHeaders: HttpHeaders;
  port = '8089';
  urlSections = 'http://localhost:' + this.port + '/section';

  constructor(private httpClient: HttpClient) {
  }

  public GetAllSectionsFromBackend(): Observable<Array<Section>> {
    this.httpHeaders  = new HttpHeaders();
    return this.httpClient.get<any>(this.urlSections, {headers: this.httpHeaders, observe: 'response'})
                          .pipe(map(value => {
                            if (value.status === 200){
                              return value.body.body;
                            }
                          }));
  }

  Test(section: Section): Observable<any> {
    console.log('zpstaje wyslane' + section);
    return this.httpClient.post(this.urlSections, section);
  }
}

export interface Section {
  id?: number;
  name?: string;
  sectionCategoriesList?: Array<SectionCategories>;
}

export interface SectionCategories {
  id?: number;
  name?: string;
  sectionSubCategoriesList?: Array<SectionSubCategories>;
}

export interface SectionSubCategories {
  id?: number;
  name?: string;
}
