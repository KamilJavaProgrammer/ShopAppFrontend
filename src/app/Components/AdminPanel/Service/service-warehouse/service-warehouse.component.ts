import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Product, ProductServiceService} from '../../../../Services/product-service.service';
import {WarehouseComponent} from '../../Product/Help/warehouse/warehouse.component';

@Component({
  selector: 'app-service-warehouse',
  templateUrl: './service-warehouse.component.html',
  styleUrls: ['./service-warehouse.component.css']
})
export class ServiceWarehouseComponent implements OnInit {

    ROUTE_EXPORT = 'SHOP';


  constructor(private  productService: ProductServiceService, private warehouseComponent: WarehouseComponent) { }

  warehouseplace = 'serwis';
  tableTitle = 'Asortyment Serwisu';



  ngOnInit(): void {
  }

  ExportData(event: Array<Product>): void {
    this.productService.ExportProduct(event, this.ROUTE_EXPORT ).subscribe(value => {
    });
  }
}
