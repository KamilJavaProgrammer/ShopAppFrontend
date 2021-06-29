import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StartAlertComponent } from './start-alert.component';

describe('StartAlertComponent', () => {
  let component: StartAlertComponent;
  let fixture: ComponentFixture<StartAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StartAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StartAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
