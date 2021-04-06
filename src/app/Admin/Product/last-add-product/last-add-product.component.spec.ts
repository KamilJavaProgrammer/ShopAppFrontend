import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LastAddProductComponent } from './last-add-product.component';

describe('LastAddProductComponent', () => {
  let component: LastAddProductComponent;
  let fixture: ComponentFixture<LastAddProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LastAddProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LastAddProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
