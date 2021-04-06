import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AmountProductAlertComponent } from './amount-product-alert.component';

describe('AmountProductAlertComponent', () => {
  let component: AmountProductAlertComponent;
  let fixture: ComponentFixture<AmountProductAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AmountProductAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AmountProductAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
