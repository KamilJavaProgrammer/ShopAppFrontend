import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product, ProductServiceService} from '../../../../../../Services/product-service.service';
import {ActivatedRoute} from '@angular/router';
import {CategoriesPipe} from '../../../../../../Pipes/categories.pipe';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

   product: Product = ({});

   sub: any;
   id: any;
   constructor(private productServiceService: ProductServiceService, private route: ActivatedRoute) {

  }

  ngOnInit(): void {
    this.sub = this.route.params.subscribe(params => {
      this.id = params.id;
      this.productServiceService.GetOneProduct(this.id).subscribe(value => {
        value.productCategory = value.productCategory[0].toUpperCase() + value.productCategory.substr(1).toLowerCase();
        value.wareHouseplace = value.wareHouseplace[0].toUpperCase() + value.wareHouseplace.substr(1).toLowerCase();

        this.product = value;
      });
    });
  }


  EditProduct(event: FormData): void{
    this.productServiceService.EditProduct(event, this.id).subscribe(value => {
      alert('udalo sie wyedytować');
    });
  }
}
