import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyInvoiceComponent } from './ready-invoice.component';

describe('ReadyInvoiceComponent', () => {
  let component: ReadyInvoiceComponent;
  let fixture: ComponentFixture<ReadyInvoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyInvoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyInvoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
