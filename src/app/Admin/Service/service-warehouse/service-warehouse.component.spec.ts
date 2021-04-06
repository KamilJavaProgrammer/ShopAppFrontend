import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceWarehouseComponent } from './service-warehouse.component';

describe('ServiceWarehouseComponent', () => {
  let component: ServiceWarehouseComponent;
  let fixture: ComponentFixture<ServiceWarehouseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceWarehouseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceWarehouseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
