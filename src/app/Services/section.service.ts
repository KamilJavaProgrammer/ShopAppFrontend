import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Product} from './product-service.service';
import {Role} from '../Enums/role.enum';
import {AuthService} from './auth.service';
import {ArticleLine} from '../Classes/article-line';
import {SectionCategories} from '../Classes/section-categories';
import {Section} from '../Classes/section';




@Injectable({
  providedIn: 'root'
})
export class SectionService {

  urlSections =  AuthService.ADDRESS_SERVER + '/sections';
  urlArticleLines = AuthService.ADDRESS_SERVER + '/articleLine';

  constructor(private httpClient: HttpClient, private authService: AuthService) {}

  public AddSectionToDatabase(section: Section): Observable<any> {

    return this.httpClient.post(this.urlSections, section, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE)});
  }


   GetAllSectionsFromBackend(): Observable<Array<Section>> {

    return this.httpClient.get<any>(this.urlSections, {observe: 'response'})
                          .pipe(map(value => {
                            if (value.status === 200){
                              return value.body;
                            }
                          }));
  }


  public AddOneArticleLine(articleLine: ArticleLine): Observable<boolean> {
    return this.httpClient.post<any>(this.urlArticleLines, articleLine, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(value => {
        return value.status === 200;
      }));
  }


  public DeleteOneArticle(id: number): Observable<boolean> {
    return this.httpClient.delete<any>(this.urlArticleLines + '/' + id, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(value => {
        return value.status === 200;
      }));
  }

  public DeleteOneSection(id: number): Observable<boolean> {
    return this.httpClient.delete<any>(this.urlSections + '/' + id, {headers: this.authService.SetJWTToken(Role.ADMIN, this.authService.JSON_CONTENT_TYPE), observe: 'response'})
      .pipe(map(value => {
        return value.status === 200;
      }));
  }

  public GetAllArticleLinesFromBackend(): Observable<Array<ArticleLine>> {
    return this.httpClient.get<any>(this.urlArticleLines, {observe: 'response'})
      .pipe(map(value => {
        if (value.status === 200){
          return value.body;
        }
      }));
  }

}


//
// export interface Section {
//   id?: number;
//   name?: string;
//   sectionCategoriesList?: Array<SectionCategories>;
// }
//
// export interface SectionCategories {
//   id?: number;
//   name?: string;
//   sectionSubCategoriesList?: Array<SectionSubCategories>;
// }
//
// export interface SectionSubCategories {
//   id?: number;
//   name?: string;
// }
// export interface ArticleLine {
//   id?: number;
//   name?: string;
//   productList?: Array<Product>;
//
// }


