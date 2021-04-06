import {Directive, HostListener, Input} from '@angular/core';

@Directive({
  selector: '[appTest]'
})
export class TestDirective {


  @Input()
  appTest: boolean;
  constructor() {

  }

  testfunction(): boolean{
    return this.appTest;
    // this.appTest = !this.appTest;
  }

}
