import {Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren} from '@angular/core';
import {CompleteOrder, OrderService} from '../../../../../Services/order.service';
import {ClientServiceService, ShopClient} from '../../../../../Services/client-service.service';
import {ProductServiceService} from '../../../../../Services/product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxCaptureService} from 'ngx-capture';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-sales-document-state',
  templateUrl: './sales-document-state.component.html',
  styleUrls: ['./sales-document-state.component.css']
})
export class SalesDocumentStateComponent implements OnInit {
  @ViewChildren('checkboxSelectedInput') inputs: QueryList<ElementRef>;
  @ViewChild('DeleteAlert') alertDelete: TemplateRef<any>;
  @ViewChild('checkboxSelectedInput') checkboxSelectedInput: ElementRef;
  @ViewChild('DeleteOneClientAlert') deleteOneShopClientAlert: TemplateRef<any>;


  orders: Array<CompleteOrder> = [];
  shopClient: ShopClient = ({});
  page = 1;
  totalRecords: number;
  checkboxSelected: Array<boolean> = [];
  selectedRow: Array<CompleteOrder> = [];
  sorting: any;
  itemsPerPage = 3;
  order: CompleteOrder;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(private productService: ProductServiceService, private ngxService: NgxUiLoaderService,
              private ngxCaptureService: NgxCaptureService, private bsModalService: BsModalService,
              private clientService: ClientServiceService, private orderService: OrderService) {
  }

  ngOnInit(): void {

    this.ngxService.startLoader('3');
    setTimeout(() => {
      this.ngxService.stopLoader('3');
    }, 200);
    this.sorting = 'Sortuj wg';
    this.GetAllOrders();

  }


  public GetAllOrders(): void{
    this.orderService.GetAllOrders().subscribe(value => {
      this.orders = value;
    });
  }

  Search(event: any): void {
    this.clientService.Search(event);
  }

  public GeneratePdf(): void
  {
    this.clientService.GeneratePdf();
  }


  Sort(): void {
    switch (this.sorting) {

      case 'Alfabetycznie': {
        this.orders.sort((a, b) => this.clientService.compareName(a, b));
        break;
      }
      default: {
        this.orders.sort();
      }
    }
  }



  SelectRow(client: ShopClient, index: number): void {
    const checkboxInputs = this.inputs.toArray();

    if (checkboxInputs[index].nativeElement.checked){
      this.selectedRow.push(client);


    }
    else {
      for (let i = 0; i < this.selectedRow.length; i++){
        if (this.selectedRow[i].id === client.id)
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
      this.bsModalService.show(this.alertDelete, this.config);
    }
  }

  CloseAlertModal(): void {
    this.bsModalService.hide();
  }

  ConfirmDelete(): void {
    const promise = new Promise(resolve => {
      this.CloseAlertModal();
      this.clientService.DeleteClients(this.selectedRow).subscribe(value => {
          resolve();
        },
        error => {
          console.log(error);
        });
    });

    promise.then(value => {
      this.sorting = 'Sortuj wg';
      this.GetAllOrders();
      this.checkboxSelected = [];
      this.selectedRow = [];


    });

  }

  RejectDelete(): void {
    this.CloseAlertModal();
    this.selectedRow = [];
    this.checkboxSelected = [];

  }

  ShowAlertDeleteOneProductModal(shopClient: ShopClient): void {
    this.bsModalService.show(this.deleteOneShopClientAlert, this.config);
    this.order = shopClient;

  }

  DeleteShopClientById(id: number): void {
    this.CloseAlertModal();
    this.clientService.DeleteShopClientById(id).subscribe(value => {

      this.GetAllOrders();
      this.sorting = 'Sortuj wg';

    }, error => {});
  }
}
