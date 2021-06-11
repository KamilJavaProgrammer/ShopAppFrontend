import {ComponentFactoryResolver, Injectable} from '@angular/core';
import {TestDynamicComponentComponent} from './test-dynamic-component/test-dynamic-component.component';

@Injectable({
  providedIn: 'root'
})
export class TestService {

  rootViewContainer: any;
 constructor(private factoryResolver: ComponentFactoryResolver) {
    this.factoryResolver = factoryResolver;
  }
  setRootViewContainerRef(viewContainerRef): void {
    this.rootViewContainer = viewContainerRef;
  }
  addDynamicComponent(): void {
    const factory = this.factoryResolver
      .resolveComponentFactory(TestDynamicComponentComponent);
    const component = factory
      .create(this.rootViewContainer.parentInjector);
    this.rootViewContainer.insert(component.hostView);
  }
}
