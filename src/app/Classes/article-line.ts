import {Product} from '../Services/product-service.service';

export class ArticleLine {

  id?: number;
  name?: string;
  productList?: Array<Product>;
}
