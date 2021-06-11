import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test2'
})
export class Test2Pipe implements PipeTransform {


 public static transform(value: string): string {

     const value1 = value.replace('":', '  ');
     const value2 = value1.replace('{', '');
     const value3 = value2.replace('}', '');
     const value4 = value3.replace('"', '');

     const rest = value4.split('  ');
     return rest[0];

  }

  transform(value: any, ...args: any[]): any {
    const value1 = value.replace('":', '  ');
    const value2 = value1.replace('{', '');
    const value3 = value2.replace('}', '');
    const value4 = value3.replace('"', '');

    const rest = value4.split('  ');
    return rest[0] + '                            ' + '(' + rest[1] + ')';
  }

}
