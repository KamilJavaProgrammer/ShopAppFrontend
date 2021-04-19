import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from './product-service.service';

@Injectable({
  providedIn: 'root'
})
export class SectionService {

  httpHeaders: HttpHeaders;
  port = '8088';
  urlSections = 'http://localhost:' + this.port + '/section';
  urlArticleLines = 'http://localhost:' + this.port + '/articleLine';

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

  public GetAllArticleLinesFromBackend(): Observable<Array<ArticleLine>> {
    this.httpHeaders  = new HttpHeaders();
    return this.httpClient.get<any>(this.urlArticleLines, {headers: this.httpHeaders, observe: 'response'})
      .pipe(map(value => {
        if (value.status === 200){
          return value.body;
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
export interface ArticleLine {
  id?: number;
  name?: string;
  productList?: Array<Product>;

}


