import { Pipe, PipeTransform } from '@angular/core';
import {stringify} from 'querystring';

@Pipe({
  name: 'categories'
})
export class CategoriesPipe implements PipeTransform {


  transform(value: any): string {

     return  value[0].toUpperCase() + value.substr(1).toLowerCase();
  }
}
