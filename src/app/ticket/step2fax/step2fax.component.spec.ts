import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Step2faxComponent } from './step2fax.component';

describe('Step2faxComponent', () => {
  let component: Step2faxComponent;
  let fixture: ComponentFixture<Step2faxComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Step2faxComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Step2faxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
