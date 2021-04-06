import {Component, OnInit} from '@angular/core';
import {Product, ProductServiceService} from '../../../product-service.service';
import {DataserviceService} from '../../../dataservice.service';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-product-state',
  templateUrl: './product-state.component.html',
  styleUrls: ['./product-state.component.css']

})
export class ProductStateComponent implements OnInit {

  product: Product;
  products: Array<Product>;
  datas: Array<any>;
  totalRecords: number;
  page = 1;
  quantity: number;
  searchtext: any;
  sort = 'Alfabetycznie';




  constructor(private productServiceService: ProductServiceService, private dataserviceService: DataserviceService) {
    this.datas = new Array<any>();
    this.products = new Array<Product>();
  }


  ngOnInit(): void {


    this.GetAllProductFromDatabase();

  }

  GetAllProductFromDatabase(): void{


    this.productServiceService.GetAllProduct().subscribe(p => {this.products = p;  this.datas = p; this.totalRecords = p.length;





    });
  }



  DeleteOneProductInDatabase(id: number): void {
    if (confirm('Are you seriously want delete this product?')) {
      this.productServiceService.DeleteProduct(id).subscribe(p => {
        console.log(p);
        this.ngOnInit();
      });

    }
    else
    {
      this.ngOnInit();
    }

  }

  GetOneProductFromDatabase(id: number): void{
    this.productServiceService.GetOneProduct(id).subscribe(p => {  this.dataserviceService.addData(p); });
  }







  // Sortuj() {
  //   if (this.sort === 'Alfabetycznie'){
  //     this.productServiceService.GetAllProduct().subscribe(p => {
  //       this.products = p ;
  //       this.products.sort((a, b) => a.name.localeCompare(b.name));
  //
  //     });
  //   }
  //   if (this.sort === 'Id malejaco'){
  //     console.log('dupa');
  //     this.productServiceService.GetAllProduct().subscribe(p => { this.products = p;
  //     });
  //   }
  //
  // }
}
