import {Component, ElementRef, EventEmitter, IterableDiffers, OnInit, Output, ViewChild} from '@angular/core';
import {Product, ProductServiceService} from '../../../../../../Services/product-service.service';

@Component({
  selector: 'app-form-add-product',
  templateUrl: './form-add-product.component.html',
  styleUrls: ['./form-add-product.component.css']
})
export class FormAddProductComponent implements OnInit {

product: Product = ({

});

  constructor(private productServiceService: ProductServiceService) {

  }

  ngOnInit(): void {
  }


  AddProductToDataBase(event: FormData): void{
    this.productServiceService.AddProduct(event).subscribe(value => {
      alert('Dodano produkt do bazdy');
    });
  }




}




