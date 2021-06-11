import {Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {ArticleLine, Section, SectionService} from '../../../../../../Services/section.service';
import {Product, ProductServiceService} from '../../../../../../Services/product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxCaptureService} from 'ngx-capture';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ClientServiceService, ShopClient} from '../../../../../../Services/client-service.service';
import {CompleteOrder} from '../../../../../../Services/order.service';

@Component({
  selector: 'app-article-line',
  templateUrl: './article-line.component.html',
  styleUrls: ['./article-line.component.css']
})
export class ArticleLineComponent implements OnInit {

  @ViewChildren('checkboxSelectedInput') inputs: QueryList<ElementRef>;
  @ViewChild('ProductsLineModal') productsModal: TemplateRef<any>;
  @ViewChild('DeleteAlert') deleteOneArticleLineAlert: TemplateRef<any>;
  @ViewChild('AddArticleLineModal') addArticleLineModal: TemplateRef<any>;


  articleLines: Array<ArticleLine> = [];
  products: Array<Product> = [];
  page = 1;
  totalRecords: number;
  sorting: any;
  itemsPerPage = 3;
  customClass = 'custom-accordion-style';

  articleLine: ArticleLine = ({
    name: '',
  });


  checkboxSelected: Array<boolean> = [];
  selectedRow: Array<Product> = [];


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

    this.GetAllArticleLines();
  }


  createImageFromBlob(image: Blob, product: Product): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => {

      product.imageByte = reader.result;
      this.products.push(product);

    }, false);

    if (image) {
      reader.readAsDataURL(image);
    }
  }



  OpenProductsModal(articleLine: ArticleLine): void {
    this.products = [];
    articleLine.productList.forEach(product => {
        this.productService.getImageFromService(product).subscribe(blob => {
          this.createImageFromBlob(blob, product);
        });
    });
    this.bsModalService.show(this.productsModal);
  }



  public GetAllArticleLines(): void{
    this.sectionService.GetAllArticleLinesFromBackend().subscribe(value => {
      this.articleLines = value;
    });
  }

  CloseAlertModal(): void {
    this.bsModalService.hide();
  }


  ShowAlertDeleteOneArticleLine(articleLine: ArticleLine): void {
    this.bsModalService.show(this.deleteOneArticleLineAlert, this.config);
    this.articleLine = articleLine;

  }



  ConfirmDelete(): void {
      this.CloseAlertModal();
      this.sectionService.DeleteOneArticle(this.articleLine.id).subscribe(value => {
        this.GetAllArticleLines();
      });

  }

  RejectDelete(): void {
    this.CloseAlertModal();
  }

  SelectRow(product: Product, index: number): void {
    const checkboxInputs = this.inputs.toArray();

    if (checkboxInputs[index].nativeElement.checked){
      this.selectedRow.push(product);


    }
    else {
      for (let i = 0; i < this.selectedRow.length; i++){
        if (this.selectedRow[i].id === product.id)
        {
          this.selectedRow.splice(i, 1);

        }
      }
    }
  }



  OpenAddArticleLinesModal(): void {
    this.products = [];
    this.bsModalService.show(this.addArticleLineModal, this.config);
    this.productService.GetAllProducts().subscribe(arrayProducts => {
      arrayProducts.forEach(product => {

        this.productService.getImageFromService(product).subscribe(blob => {
          this.createImageFromBlob(blob, product);
        });
      });
    });
  }
}
