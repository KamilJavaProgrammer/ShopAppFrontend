import {Component, OnInit} from '@angular/core';
import {SectionService} from '../../../../../../Services/section.service';
import {ProductServiceService} from '../../../../../../Services/product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxCaptureService} from 'ngx-capture';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ClientServiceService} from '../../../../../../Services/client-service.service';
import {Role} from '../../../../../../Enums/role.enum';
import {SectionSubCategories} from '../../../../../../Classes/section-sub-categories';
import {Section} from '../../../../../../Classes/section';
import {SectionCategories} from '../../../../../../Classes/section-categories';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.css']
})
export class AddSectionComponent implements OnInit {



  sectionSubCategoriesList: Array<SectionSubCategories> = [];
  section: Section = ({
    name: '',
    sectionCategoriesList: []
  });
  name: any;



  constructor(private productService: ProductServiceService, private ngxService: NgxUiLoaderService,
              private ngxCaptureService: NgxCaptureService, private bsModalService: BsModalService,
              private clientService: ClientServiceService, private sectionService: SectionService) {
  }

  ngOnInit(): void {

  }


  AddSubCategory(): void {
    const section: SectionSubCategories = ({});
    this.sectionSubCategoriesList.push(section);

  }

  savepart(): void{
     const sectionCategories: SectionCategories = ({
        sectionSubCategoriesList : this.sectionSubCategoriesList,
         name: this.name
     });

     this.section.sectionCategoriesList.push(sectionCategories);
     this.sectionSubCategoriesList = [];
     this.name = '';
  }


  SaveSection(): void {
    this.sectionService.AddSectionToDatabase(this.section).subscribe(value1 => {

    });
  }
}
