import { Component, OnInit } from '@angular/core';
import {DataserviceService} from '../../dataservice.service';
import {Product, ProductServiceService} from '../../product-service.service';


@Component({
  selector: 'app-form-edit-product',
  templateUrl: './form-edit-product.component.html',
  styleUrls: ['./form-edit-product.component.css']
})
export class FormEditProductComponent implements OnInit {
  product2: Product;

  name: string;
  location: string;
  state: string;
  numberofitems: number;
  id: number;
  cod: string;

  constructor(public dataserviceService: DataserviceService, private productservice: ProductServiceService) { }

  ngOnInit(): void {
    this.dataserviceService.date.subscribe(p => {this.numberofitems = +p.numberOfItems;
                                                 this.cod = p.cod;
                                                 this.state = p.status;
                                                 this.location = p.location;
                                                 this.id = p.id;
                                                 });

  }


  Clear(): void{
    this.name = '';
    this.numberofitems = null;
    this.state = '';
    this.location = '';
    this.cod = '';
  }

  PatchProduct() {

    this.product2 = ({
      status : this.state,
      location: this.location,
       numberOfItems: this.numberofitems.toString(),
       cod: this.cod

    });


    this.productservice.PatchProduct(this.id, this.product2).subscribe(p => {console.log(p); this.Clear(); });

  }
}
