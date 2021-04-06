import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopClientsComponent } from './shop-clients.component';

describe('ShopClientsComponent', () => {
  let component: ShopClientsComponent;
  let fixture: ComponentFixture<ShopClientsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShopClientsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShopClientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
