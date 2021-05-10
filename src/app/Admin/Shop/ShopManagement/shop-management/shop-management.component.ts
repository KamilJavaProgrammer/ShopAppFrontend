import {Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {Product, ProductServiceService} from '../../../../product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxCaptureService} from 'ngx-capture';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ClientServiceService, ShopClient} from '../../../../client-service.service';
import {CompleteOrder, OrderService} from '../../../../order.service';
import {ArticleLine, Section, SectionService} from '../../../../section.service';

@Component({
  selector: 'app-shop-management',
  templateUrl: './shop-management.component.html',
  styleUrls: ['./shop-management.component.css']
})
export class ShopManagementComponent implements OnInit {



  constructor(private productService: ProductServiceService, private ngxService: NgxUiLoaderService,
              private ngxCaptureService: NgxCaptureService, private bsModalService: BsModalService,
              private clientService: ClientServiceService, private sectionService: SectionService) {
  }

  ngOnInit(): void {

    this.ngxService.startLoader('3');
    setTimeout(() => {
      this.ngxService.stopLoader('3');
    }, 200);

  }
}
