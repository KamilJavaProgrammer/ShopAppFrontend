import { Component, OnInit } from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit {

  constructor(private ngxService: NgxUiLoaderService) { }

  ngOnInit(): void {

    this.ngxService.startLoader('2');
    setTimeout(() => {
      this.ngxService.stopLoader('2');
    }, 500);
  }

}
