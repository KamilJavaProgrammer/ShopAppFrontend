import { Pipe, PipeTransform } from '@angular/core';
import {formatDate} from '@angular/common';


@Pipe({
  name: 'date'
})
export class DatePipe implements PipeTransform {



  transform(date: string): string {
    return date.slice(0, 17);
  }

}
