import { Component, OnInit } from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-order-alert',
  templateUrl: './order-alert.component.html',
  styleUrls: ['./order-alert.component.css']
})
export class OrderAlertComponent implements OnInit {

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }
  CloseAlertModal(): void {
    this.modalService.hide();
  }

}
