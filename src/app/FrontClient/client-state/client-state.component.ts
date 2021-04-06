import { Component, OnInit } from '@angular/core';
import {Client, Product, ProductServiceService} from '../../product-service.service';
import {DataserviceService} from '../../dataservice.service';

@Component({
  selector: 'app-client-state',
  templateUrl: './client-state.component.html',
  styleUrls: ['./client-state.component.css']
})
export class ClientStateComponent implements OnInit {



  clients: Array<Client>;
  totalRecords: number;
  page = 1;
  quantity: number;
  searchtext: any;
  sort = 'Alfabetycznie';


  constructor(private productServiceService: ProductServiceService, private dataserviceService: DataserviceService) {

  }


  ngOnInit() {
    this.GetAllProductFromDatabase();

  }

  GetAllProductFromDatabase(){
    this.productServiceService.GetAllClients().subscribe(p => {this.clients = p;

    });
  }

  DeleteOneClientInDatabase(id: number) {
    if (confirm('Are you seriously want delete this product?')) {
      this.productServiceService.DeleteClient(id).subscribe(p => {
        this.ngOnInit();
      });
    }
    else
    {
      this.ngOnInit();
    }

  }

  // GetOneProductFromDatabase(id: number){
  //   this.productServiceService.GetOneClient(id).subscribe(p => {  this.dataserviceService.addDataClient(p); });
  // }




}
