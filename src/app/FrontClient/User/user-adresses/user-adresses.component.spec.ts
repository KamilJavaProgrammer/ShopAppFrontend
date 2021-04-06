import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserAdressesComponent } from './user-adresses.component';

describe('UserAdressesComponent', () => {
  let component: UserAdressesComponent;
  let fixture: ComponentFixture<UserAdressesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserAdressesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserAdressesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
