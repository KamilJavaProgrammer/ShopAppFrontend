import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopClientADDComponent } from './shop-client-add.component';

describe('ShopClientADDComponent', () => {
  let component: ShopClientADDComponent;
  let fixture: ComponentFixture<ShopClientADDComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopClientADDComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopClientADDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
