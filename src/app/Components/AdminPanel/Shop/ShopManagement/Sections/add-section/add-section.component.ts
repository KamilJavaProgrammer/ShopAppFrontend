import {Component, ElementRef, OnInit, QueryList, TemplateRef, ViewChild, ViewChildren, ViewContainerRef} from '@angular/core';
import {ArticleLine, Section, SectionCategories, SectionService, SectionSubCategories} from '../../../../../../Services/section.service';
import {Product, ProductServiceService} from '../../../../../../Services/product-service.service';
import {NgxUiLoaderService} from 'ngx-ui-loader';
import {NgxCaptureService} from 'ngx-capture';
import {BsModalService} from 'ngx-bootstrap/modal';
import {ClientServiceService} from '../../../../../../Services/client-service.service';
import {element} from 'protractor';
import {Renderer} from '@angular/compiler-cli/ngcc/src/rendering/renderer';

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


  savetoDatabase(): void {
    this.sectionService.Test(this.section).subscribe(value1 => {
      console.log(value1);
      console.log(value1);
    });
  }
}
