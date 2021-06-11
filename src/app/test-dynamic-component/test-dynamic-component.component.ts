import {Component, ComponentFactoryResolver, OnInit, ViewContainerRef} from '@angular/core';

@Component({
  selector: 'app-test-dynamic-component',
  templateUrl: './test-dynamic-component.component.html',
  styleUrls: ['./test-dynamic-component.component.css']
})
export class TestDynamicComponentComponent implements OnInit {

  constructor(private componentFactoryResolver: ComponentFactoryResolver,
              private viewContainerRef: ViewContainerRef) {}


  ngOnInit(): void {
  }

  createDynamicComponent() : void {
    const factory = this.componentFactoryResolver.resolveComponentFactory(TestDynamicComponentComponent);
    const componentRef = this.viewContainerRef.createComponent(factory);
    componentRef.changeDetectorRef.detectChanges();
  }

}
