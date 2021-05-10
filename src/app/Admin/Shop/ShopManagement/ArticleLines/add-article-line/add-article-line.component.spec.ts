import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddArticleLineComponent } from './add-article-line.component';

describe('AddArticleLineComponent', () => {
  let component: AddArticleLineComponent;
  let fixture: ComponentFixture<AddArticleLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddArticleLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddArticleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
