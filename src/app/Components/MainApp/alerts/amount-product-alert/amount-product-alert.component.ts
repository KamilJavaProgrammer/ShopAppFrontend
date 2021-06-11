import {Component, Input, OnInit} from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-amount-product-alert',
  templateUrl: './amount-product-alert.component.html',
  styleUrls: ['./amount-product-alert.component.css']
})
export class AmountProductAlertComponent implements OnInit {



  @Input()
  maxValue: any;

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }


  CloseAlertModal(): void {
    this.modalService.hide();
  }

}
