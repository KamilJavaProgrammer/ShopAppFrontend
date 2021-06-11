import { Pipe, PipeTransform } from '@angular/core';
import {KeyValue} from '@angular/common';

@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform {

  transform(value: string): string {

     const value2 = value.slice(1, value.length - 1);
     const one = value2.split('=');
     return one[0] + ' ' + '(' + one[1] + ')';

   }

}
