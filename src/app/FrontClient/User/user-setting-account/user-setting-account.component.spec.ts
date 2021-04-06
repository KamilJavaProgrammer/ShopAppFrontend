import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSettingAccountComponent } from './user-setting-account.component';

describe('UserSettingAccountComponent', () => {
  let component: UserSettingAccountComponent;
  let fixture: ComponentFixture<UserSettingAccountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserSettingAccountComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserSettingAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
