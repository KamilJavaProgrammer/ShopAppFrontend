import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-client-order-state',
  templateUrl: './client-order-state.component.html',
  styleUrls: ['./client-order-state.component.css']
})
export class ClientOrderStateComponent implements OnInit {

  orders = [];

  constructor() { }


  ngOnInit(): void {
  }

}
