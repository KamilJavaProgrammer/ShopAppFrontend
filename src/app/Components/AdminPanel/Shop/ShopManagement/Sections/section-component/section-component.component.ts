import {Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {ArticleLine, Section, SectionService} from '../../../../../../Services/section.service';
import {Product, ProductServiceService} from '../../../../../../Services/product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxCaptureService} from 'ngx-capture';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ClientServiceService} from '../../../../../../Services/client-service.service';

@Component({
  selector: 'app-section-component',
  templateUrl: './section-component.component.html',
  styleUrls: ['./section-component.component.css']
})
export class SectionComponentComponent implements OnInit {

  @ViewChildren('checkboxSelectedInput') inputs: QueryList<ElementRef>;
  @ViewChild('DeleteAlert') alertDelete: TemplateRef<any>;
  @ViewChild('checkboxSelectedInput') checkboxSelectedInput: ElementRef;
  @ViewChild('DeleteOneClientAlert') deleteOneShopClientAlert: TemplateRef<any>;


  articleLines: Array<ArticleLine> = [];
  sections: Array<Section> = [];
  products: Array<Product> = [];


  page = 1;
  totalRecords: number;
  sorting: any;
  itemsPerPage = 3;
  customClass = 'custom-accordion-style';


  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(private productService: ProductServiceService, private ngxService: NgxUiLoaderService,
              private ngxCaptureService: NgxCaptureService, private bsModalService: BsModalService,
              private clientService: ClientServiceService, private sectionService: SectionService) {
  }

  ngOnInit(): void {
    this.GetSectionsFromServer();
  }


  public GetSectionsFromServer(): void{

    this.sectionService.GetAllSectionsFromBackend().subscribe(value => {
      this.sections = value;
    });
  }


  CloseAlertModal(): void {
    this.bsModalService.hide();
  }


  DeleteOneSection(id: number): void {
    this.sectionService.DeleteOneSection(id).subscribe(value => {
      this.GetSectionsFromServer();
    });
  }
}
