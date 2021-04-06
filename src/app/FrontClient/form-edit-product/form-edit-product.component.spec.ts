import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEditProductComponent } from './form-edit-product.component';

describe('FormEditProductComponent', () => {
  let component: FormEditProductComponent;
  let fixture: ComponentFixture<FormEditProductComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormEditProductComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEditProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
