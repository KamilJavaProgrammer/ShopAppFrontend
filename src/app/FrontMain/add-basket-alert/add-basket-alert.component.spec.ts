import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBasketAlertComponent } from './add-basket-alert.component';

describe('AddBasketAlertComponent', () => {
  let component: AddBasketAlertComponent;
  let fixture: ComponentFixture<AddBasketAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBasketAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBasketAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
