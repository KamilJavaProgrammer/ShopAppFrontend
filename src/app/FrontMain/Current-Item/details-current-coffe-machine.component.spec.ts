import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailsCurrentCoffeMachineComponent } from './details-current-coffe-machine.component';

describe('DetailsCurrentCoffeMachineComponent', () => {
  let component: DetailsCurrentCoffeMachineComponent;
  let fixture: ComponentFixture<DetailsCurrentCoffeMachineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailsCurrentCoffeMachineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailsCurrentCoffeMachineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
