import {Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {ArticleLine, SectionService} from '../../../../../section.service';
import {Product, ProductServiceService} from '../../../../../product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxCaptureService} from 'ngx-capture';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ClientServiceService} from '../../../../../client-service.service';

@Component({
  selector: 'app-add-article-line',
  templateUrl: './add-article-line.component.html',
  styleUrls: ['./add-article-line.component.css']
})
export class AddArticleLineComponent implements OnInit {

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

    this.GetAllProducts();
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



  GetAllProducts(): void {
    this.products = [];
    this.productService.GetAllProducts().subscribe(arrayProducts => {
      arrayProducts.forEach(product => {

        this.productService.getImageFromService(product).subscribe(blob => {
          this.createImageFromBlob(blob, product);
        });
      });
    });
  }

  SaveArticleLines(): void {

    if (this.selectedRow.length < 1){
      alert('Lista jest pusta!');

    }
    else
    {
      this.articleLine.productList = this.selectedRow;
      this.sectionService.AddOneArticleLine(this.articleLine).subscribe(value => {
        alert('Dodano sekcję produktów');
        this.selectedRow = [];
        this.checkboxSelected = [];
        this.articleLine.name = '';
        this.articleLine.productList = [];
      });
    }

  }
}
