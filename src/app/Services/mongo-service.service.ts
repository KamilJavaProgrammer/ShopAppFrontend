import { Injectable } from '@angular/core';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MongoServiceService {

  port = '8088';
  url = 'http://localhost:' + this.port + '/data';


  constructor(private httpClient: HttpClient) {

  }
  public GetDataFromMongoById(id: string): Observable<Data>{
    return this.httpClient.get<any>(this.url + '/' + id,{observe: 'response'}).pipe(map(value => {

      if(value.status === 200)
      {
        return value.body;
      }
    }));
  }
}

export class Data {
  id?: string;
  data?: Array<string>;
}
