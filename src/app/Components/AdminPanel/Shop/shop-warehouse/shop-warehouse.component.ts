import {
  Component,
  ElementRef, EventEmitter,
  OnInit, Output,
  QueryList, Renderer2, TemplateRef, ViewChild,
  ViewChildren,
} from '@angular/core';
import {Product, ProductServiceService} from '../../../../Services/product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxCaptureService} from 'ngx-capture';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {BsModalService} from 'ngx-bootstrap/modal';
import {WarehouseComponent} from '../../Product/Help/warehouse/warehouse.component';



@Component({
  selector: 'app-shop-warehouse',
  templateUrl: './shop-warehouse.component.html',
  styleUrls: ['./shop-warehouse.component.css']


})
export class ShopWarehouseComponent implements OnInit {

  ROUTE_EXPORT = 'SERVICE';
  @Output() eventEmitter: EventEmitter<any> = new EventEmitter<any>();



  constructor(private productService: ProductServiceService, private ngxService: NgxUiLoaderService,
              private ngxCaptureService: NgxCaptureService, private bsModalService: BsModalService, private warehouseComponent: WarehouseComponent) {
  }
   warehouseplace = 'sklep';
   tableTitle = 'Asortyment Sklepu';

  ngOnInit(): void {
  }


  ExportData(event: Array<Product>): void {
    this.productService.ExportProduct(event, this.ROUTE_EXPORT).subscribe(value => {
      this.warehouseComponent.GetImages();
      this.warehouseComponent.sorting = 'Sortuj wg';
      this.warehouseComponent.selectedRow = [];

    });
  }

}
