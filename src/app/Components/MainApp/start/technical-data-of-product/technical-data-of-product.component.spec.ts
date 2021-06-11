import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TechnicalDataOfProductComponent } from './technical-data-of-product.component';

describe('TechnicalDataOfProductComponent', () => {
  let component: TechnicalDataOfProductComponent;
  let fixture: ComponentFixture<TechnicalDataOfProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TechnicalDataOfProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TechnicalDataOfProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
