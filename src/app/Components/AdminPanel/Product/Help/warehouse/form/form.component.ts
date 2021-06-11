import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Product, ProductServiceService} from '../../../../../../Services/product-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {


  @Input()
  product: Product;

  filesToUpload: FileList;
  currentFile: File;
  subcategories: Array<string>;

  @ViewChild('fileInput')
  fileInput: ElementRef;
  placeWarehouse: string;

  @Input()
  titlename: string;


  @Output() eventEmiter: EventEmitter<any> = new EventEmitter<any>();



  constructor(private productServiceService: ProductServiceService) {
  }

  ngOnInit(): void {
    this.productServiceService.GetAllSubCategories().subscribe(value => {
      this.subcategories = value;
    });

  }

  SelectFile(event): void {
    this.filesToUpload = event.target.files;
  }

  Clear(): void {
    this.product.productCategory = '';
    this.product.productSubCategory = '';
    this.product.productName = '';
    this.product.manufacturer = '';
    this.product.serialNumber = '';
    this.product.model = '';
    this.product.productPrice = '';
    this.product.numberOfItems = '';
    this.product.location = '';
    this.product.cod = '';
    this.product.status = '';
    this.product.description = '';
    this.fileInput.nativeElement.value = '';
  }

  AddDynamicallyForm(): void{
    if (this.product.productCategory === 'Ekspresy automatyczne' || this.product.productCategory === 'Ekspresy kolbowe' || this.product.productCategory === 'Części zamienne') {
      document.getElementById('dataCofeMachine').style.display = 'block';
    } else {
      document.getElementById('dataCofeMachine').style.display = 'none';
    }
  }



  // SendProductToDatabase(): void {
  //
  //   const promise = new Promise(resolve => {
  //
  //   const formData = new FormData();
  //
  //   try {
  //     formData.append('fileupload', this.filesToUpload.item(0), this.filesToUpload.item(0).name);
  //   }
  //   catch (e) {
  //     console.log(e);
  //   }
  //   finally {
  //     formData.append('productCategory', this.product.productCategory.toLowerCase());
  //     formData.append('productSubCategory', this.product.productSubCategory.toLowerCase());
  //     formData.append('productName', this.product.productName);
  //     formData.append('manufacturer', this.product.manufacturer);
  //     formData.append('serialNumber', this.product.serialNumber);
  //     formData.append('model', this.product.model);
  //     formData.append('productPrice', this.product.productPrice);
  //     formData.append('numberOfItems', this.product.numberOfItems);
  //     formData.append('location', this.product.location);
  //     formData.append('cod', this.product.cod);
  //     formData.append('status', this.product.status);
  //     formData.append('description', this.product.description);
  //     formData.append('placeWarehouse', this.product.wareHouseplace);
  //     resolve(formData);
  //   }
  //
  //   });
  //
  //   promise.then(value => {
  //     this.eventEmiter.emit(value);
  //     this.Clear();
  //     this.ngOnInit();
  //   });
  // }


  SendProductToDatabase(): void {

    const promise = new Promise(resolve => {

      const formData = new FormData();

      try {
        formData.append('fileupload', this.filesToUpload.item(0), this.filesToUpload.item(0).name);
      }
      catch (e) {
        console.log(e);
      }
      finally {
        formData.append('product', JSON.stringify(this.product));
        resolve(formData);
      }

    });

    promise.then(value => {
      this.productServiceService.AddProduct2(value).subscribe(value1 => {
        alert('Dodano produkt do bazdy');
      });
      // this.Clear();
      // this.ngOnInit();
    });
  }

}
