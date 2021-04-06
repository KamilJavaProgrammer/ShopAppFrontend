import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatacompanyComponent } from './datacompany.component';

describe('DatacompanyComponent', () => {
  let component: DatacompanyComponent;
  let fixture: ComponentFixture<DatacompanyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatacompanyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatacompanyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
