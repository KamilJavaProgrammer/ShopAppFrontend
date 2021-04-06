import { Component, OnInit } from '@angular/core';
import {Company, CompanyServiceService} from '../../company-service.service';

@Component({
  selector: 'app-datacompany',
  templateUrl: './datacompany.component.html',
  styleUrls: ['./datacompany.component.css']
})
export class DatacompanyComponent implements OnInit {

  company: Array<Company>;

  constructor(private companyServiceService: CompanyServiceService) { }

  ngOnInit(): void {
    this.companyServiceService.GetAllCompanies().subscribe(value => {this.company = value;});
  }

}
