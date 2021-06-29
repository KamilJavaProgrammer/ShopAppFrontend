import { Pipe, PipeTransform } from '@angular/core';
import {SortOption} from '../Enums/sort-option.enum';

@Pipe({
  name: 'sortOption'
})
export class SortOptionPipe implements PipeTransform {

  transform(option: string): string {
    switch (option)
    {
      case 'Sortuj wg': return 'Sortuj wg';
      case 'Alphabetically': return 'Alfabetycznie';
      case 'Ascending_price': return 'Cena rosnąco';
      case 'Descending_price': return 'Cena malejąco';
    }
  }
}
