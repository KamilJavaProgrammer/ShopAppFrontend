import { Component, OnInit } from '@angular/core';
import {BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-start-alert',
  templateUrl: './start-alert.component.html',
  styleUrls: ['./start-alert.component.css']
})
export class StartAlertComponent implements OnInit {

  constructor(private modalService: BsModalService) { }

  ngOnInit(): void {
  }


  CloseAlertModal(): void {
    this.modalService.hide();
  }

}
