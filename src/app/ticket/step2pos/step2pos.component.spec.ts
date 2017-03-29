import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2posComponent } from './step2pos.component';

describe('Step2posComponent', () => {
  let component: Step2posComponent;
  let fixture: ComponentFixture<Step2posComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step2posComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2posComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
