import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArticleLineComponent } from './article-line.component';

describe('ArticleLineComponent', () => {
  let component: ArticleLineComponent;
  let fixture: ComponentFixture<ArticleLineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArticleLineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArticleLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
