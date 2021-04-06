import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientStateComponent } from './client-state.component';

describe('ClientStateComponent', () => {
  let component: ClientStateComponent;
  let fixture: ComponentFixture<ClientStateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClientStateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClientStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
