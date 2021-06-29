import {
  Component,
  ElementRef,
  OnInit,
  QueryList,
  TemplateRef,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ClientServiceService, ShopClient} from '../../../../Services/client-service.service';
import {Client, Product, ProductServiceService} from '../../../../Services/product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxCaptureService} from 'ngx-capture';
import {BsModalService} from 'ngx-bootstrap/modal';
import {Role} from '../../../../Enums/role.enum';


@Component({
  selector: 'app-shop-clients',
  templateUrl: './shop-clients.component.html',
  styleUrls: ['./shop-clients.component.css']
})
export class ShopClientsComponent implements OnInit {

  @ViewChildren('checkboxSelectedInput') inputs: QueryList<ElementRef>;
  @ViewChild('DeleteAlert') alertDelete: TemplateRef<any>;
  @ViewChild('checkboxSelectedInput') checkboxSelectedInput: ElementRef;
  @ViewChild('DeleteOneClientAlert') deleteOneShopClientAlert: TemplateRef<any>;


  shopClients: Array<ShopClient> = [];
  page = 1;
  totalRecords: number;
  checkboxSelected: Array<boolean> = [];
  selectedRow: Array<ShopClient> = [];
  sorting: any;
  itemsPerPage = 3;
  shopClient: ShopClient;

  config = {
    animated: true,
    keyboard: true,
    backdrop: true,
    ignoreBackdropClick: false,
    class: 'modal-lg'
  };

  constructor(private productService: ProductServiceService, private ngxService: NgxUiLoaderService,
              private ngxCaptureService: NgxCaptureService, private bsModalService: BsModalService,
              private clientService: ClientServiceService) {
  }

  ngOnInit(): void {

    this.ngxService.startLoader('3');
    setTimeout(() => {
      this.ngxService.stopLoader('3');
    }, 200);
    this.sorting = 'Sortuj wg';
    this.GetShopClients();

  }


  public GetShopClients(): void{
    this.clientService.GetAllShopClients(Role.ADMIN).subscribe(value => {
      this.shopClients = value;
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
        this.shopClients.sort((a, b) => this.clientService.compareName(a, b));
        break;
      }
      default: {
        this.shopClients.sort();
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
      this.GetShopClients();
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
    this.shopClient = shopClient;

  }

  DeleteShopClientById(id: number): void {
    this.CloseAlertModal();
    this.clientService.DeleteShopClientById(id).subscribe(value => {

      this.GetShopClients();
      this.sorting = 'Sortuj wg';

    }, error => {});
  }
}
