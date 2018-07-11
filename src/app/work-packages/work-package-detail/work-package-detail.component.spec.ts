import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPackageDetailComponent } from './work-package-detail.component';

describe('WorkPackageDetailComponent', () => {
  let component: WorkPackageDetailComponent;
  let fixture: ComponentFixture<WorkPackageDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPackageDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPackageDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
