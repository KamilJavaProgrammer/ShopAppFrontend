import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDocumentStateComponent } from './sales-document-state.component';

describe('SalesDocumentStateComponent', () => {
  let component: SalesDocumentStateComponent;
  let fixture: ComponentFixture<SalesDocumentStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDocumentStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDocumentStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
