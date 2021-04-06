import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopWarehouseComponent } from './shop-warehouse.component';

describe('ShopWarehouseComponent', () => {
  let component: ShopWarehouseComponent;
  let fixture: ComponentFixture<ShopWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
