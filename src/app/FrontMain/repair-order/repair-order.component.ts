import {Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild} from '@angular/core';
import {Product, ProductServiceService} from '../../product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {OrderService, RepairOrder} from '../../order.service';

@Component({
  selector: 'app-repair-order',
  templateUrl: './repair-order.component.html',
  styleUrls: ['./repair-order.component.css']
})
export class RepairOrderComponent implements OnInit, OnDestroy {

  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('nameInput') nameInput: ElementRef;
  @ViewChild('surnameInput') surnameInput: ElementRef;
  repairOrder: RepairOrder = ({
    serviceClient : ({
      address : ({})
    })
  });
  filesToUpload: FileList;
  titlePage = 'Zlecenie naprawy';

  constructor(private productServiceService: ProductServiceService, private ngxService: NgxUiLoaderService,
              private orderService: OrderService) {
  }

  ngOnInit(): void {
    this.ngxService.startLoader('1');

    document.getElementById('article').style.display = 'none';
    this.ngxService.stopLoader('1');


  }

  ngOnDestroy(): void {
    document.getElementById('article').style.display = 'block';
  }

  SelectFile(event): void {
    this.filesToUpload = event.target.files;
  }


  Clear(): void {
    this.repairOrder.serviceClient.name = '';
    this.repairOrder.serviceClient.surname = '';
    this.repairOrder.serviceClient.address.placeOfresident = '';
    this.repairOrder.serviceClient.address.postCode = '';
    this.repairOrder.serviceClient.address.town = '';
    this.repairOrder.serviceClient.phoneNumber = '';
    this.repairOrder.description = '';
    this.fileInput.nativeElement.value = '';
  }



  SendProductToDatabase(): void {
    const promise = new Promise(resolve => {

      const formData = new FormData();

      try {
        formData.append('fileupload', this.filesToUpload.item(0), this.filesToUpload.item(0).name);
      }
      catch (e) {
        console.log('problem');
      }
      finally {
        resolve(formData);
      }

    });

    promise.then(value => {
      // this.orderService.SendRepairOrder(value, this.repairOrder);
      this.Clear();
      alert('Twoje zlecenie zostało przyjęte');
    });
  }

}
