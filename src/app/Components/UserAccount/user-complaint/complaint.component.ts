import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxUiLoaderService} from 'ngx-ui-loader';

@Component({
  selector: 'app-complaint',
  templateUrl: './complaint.component.html',
  styleUrls: ['./complaint.component.css']
})
export class ComplaintComponent implements OnInit, OnDestroy {

  constructor(private ngxService: NgxUiLoaderService) {
    document.getElementById('userComplaints').style.color = 'crimson';
    document.getElementById('userDashboardCard').style.display = 'none';


  }

  ngOnInit(): void {

    this.ngxService.startLoader('2');
    setTimeout(() => {
      this.ngxService.stopLoader('2');
    }, 500);
  }

  ngOnDestroy(): void {
    document.getElementById('userComplaints').style.color = 'black';
    document.getElementById('userDashboardCard').style.display = 'block';


  }

}
