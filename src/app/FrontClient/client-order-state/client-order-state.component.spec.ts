import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientOrderStateComponent } from './client-order-state.component';

describe('ClientOrderStateComponent', () => {
  let component: ClientOrderStateComponent;
  let fixture: ComponentFixture<ClientOrderStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientOrderStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientOrderStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
