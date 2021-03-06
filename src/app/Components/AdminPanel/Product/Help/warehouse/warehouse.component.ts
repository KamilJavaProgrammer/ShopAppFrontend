import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {Product, ProductServiceService} from '../../../../../Services/product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxCaptureService} from 'ngx-capture';
import {BsModalService} from 'ngx-bootstrap/modal';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import {Router} from '@angular/router';
import {EditProductComponent} from './edit-product/edit-product.component';
import {DomSanitizer} from '@angular/platform-browser';
import {Role} from '../../../../../Enums/role.enum';
import {AuthService} from '../../../../../Services/auth.service';

@Component({
  selector: 'app-warehouse',
  templateUrl: './warehouse.component.html',
  styleUrls: ['./warehouse.component.css']
})
export class WarehouseComponent implements OnInit, AfterViewInit {


  @Input() warehouseplace: string;


  @ViewChild('ResolveExport') exportOK: TemplateRef<any>;


  @ViewChildren('checkboxSelectedInput') inputs: QueryList<ElementRef>;

  @ViewChild('DeleteAlert') alertDelete: TemplateRef<any>;
  @ViewChild('technicalDataModal') technicalDataModal: TemplateRef<any>;

  @ViewChild('DeleteOneProductAlert') deleteOneProductAlert: TemplateRef<any>;

  @Output() eventEmitter: EventEmitter<any> = new EventEmitter<any>();

  products: Array<Product> = [];
  productPrices = [];
  path = AuthService.ADDRESS_SERVER + '/image';
  page = 1;
  totalRecords: number;
  checkboxSelected: Array<boolean> = [];
  sorting: any;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  selectedRow: Array<Product> = [];
  itemsPerPage = 5;
  @Input() tableTitle: string;

  product: Product;
  color =  'green';
  data: string;

  positiveinfinity = Number.POSITIVE_INFINITY;


  constructor(private productService: ProductServiceService, private ngxService: NgxUiLoaderService,
              private ngxCaptureService: NgxCaptureService, private bsModalService: BsModalService,
              private router: Router, public editProductComponent: EditProductComponent,
              private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.ngxService.start();
    this.sorting = 'Sortuj wg';
    this.GetImages();


   }
  ngAfterViewInit(): void {

  }


  GetImages(): void{

    this.productService.GetAllProductsParts(this.warehouseplace, Role.ADMIN).subscribe( async value => {
        this.products = [];
        await  value.forEach( value1 => {
          this.getImageFromService(value1);
        });
        await  this.ngxService.stop();
      },
      error => {
        console.log(error);
        this.ngxService.stop();
      });

  }

  async getImageFromService(product): Promise<void> {

    await this.productService.GetImageByPathFromService(product.pathToFile).subscribe(data => {
        this.createImageFromBlob(data, product);

      }, error => {
        console.log(error);
      });

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

  compare(a, b): number {
    if (a < b) {
      return -1;
    }
    if (a > b) {
      return 1;
    }
    return 0;
  }

  Search(event: any): void {
    const spanItems = document.querySelectorAll('.tr-data');
    const searchItem = event.target.value.toLowerCase();

    spanItems.forEach(value => {
      if (value.textContent.toLowerCase().indexOf(searchItem) !== -1) {

        value.closest<HTMLElement>('.tr-data').style.display = '';

      } else {
        value.closest<HTMLElement>('.tr-data').style.display = 'none';
      }

    });

  }

  comparePrice(a: Product, b: Product): number {
    if (+a.productPrice < +b.productPrice) {
      return -1;
    }
    if (+a.productPrice > +b.productPrice) {
      return 1;
    }
    return 0;
  }


  compareName(a: Product, b: Product): number {
    if (a.productName < b.productName) {
      return -1;
    }
    if (a.productName > b.productName) {
      return 1;
    }
    return 0;
  }


  Sort(): void {
    switch (this.sorting) {

      case 'Cena rosn??co': {
        this.products.sort((a, b) => this.comparePrice(a, b));
        break;
      }
      case 'Cena malej??co': {
        this.products.sort((a, b) => this.comparePrice(a, b));
        this.products.reverse();
        break;
      }

      case 'Alfabetycznie': {
        this.products.sort((a, b) => this.compareName(a, b));
        break;
      }
      default: {
        this.products.sort();
      }

    }

  }

  public GeneratePdf(): void
  {
    const data = document.getElementById('table');
    html2canvas(data).then(canvas => {
      const imgWidth = 208;
      const pageHeight = 295;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      const heightLeft = imgHeight;

      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4'); // A4 size page of PDF
      const position = 0;
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight);
      pdf.save('Produkty.pdf'); // Generated PDF
    });
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


  ShowModalDeleteItem(): void {
    if (this.selectedRow.length < 1)
    {
      alert('Lista jest pusta!');
    }
    else
    {
      this.data = 'Czy napewno chcesz usun???? te przedmioty?';
      this.bsModalService.show(this.alertDelete, this.config);
    }
  }

  CloseAlertModal(): void {
    this.bsModalService.hide();
  }



  ConfirmDelete(): void {
    const promise = new Promise(resolve => {
      this.CloseAlertModal();
      this.productService.DeleteProducts(this.selectedRow).subscribe(value => {
          resolve();
        },
        error => {
          console.log(error);
        });
    });

    promise.then(value => {
      this.GetImages();
      this.sorting = 'Sortuj wg';
      this.checkboxSelected = [];

    });

  }

  RejectDelete(): void {
    this.CloseAlertModal();
    this.selectedRow = [];
    this.checkboxSelected = [];

  }

  ViewTechnicalDataProduct(product: Product): void {
    this.product = product;
    this.bsModalService.show(this.technicalDataModal, this.config);

  }



  ShowAlertDeleteOneProductModal(product: Product): void {
    this.bsModalService.show(this.deleteOneProductAlert, this.config);
    this.product = product;

  }

  DeleteProductById(id: number): void {
    this.CloseAlertModal();
    this.productService.DeleteProduct(id).subscribe(value => {

      this.GetImages();
      this.sorting = 'Sortuj wg';

    }, error => {});
  }


  ExportSelected(): void {
     if (this.selectedRow.length < 1){
          alert('Lista jest pusta');
     }
     else{
         this.eventEmitter.emit(this.selectedRow);
         this.ViewExportOkModal(() => {

           setTimeout(() => {
             this.GetImages();
             this.selectedRow = [];
             this.checkboxSelected = [];
             this.sorting = 'Sortuj wg';
           }, 1000);

         });


     }
  }

  ViewExportOkModal(callback): void{

    this.bsModalService.show(this.exportOK, this.config);
    callback();
  }
}


