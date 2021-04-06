import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FVformComponent } from './fvform.component';

describe('FVformComponent', () => {
  let component: FVformComponent;
  let fixture: ComponentFixture<FVformComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FVformComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FVformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
