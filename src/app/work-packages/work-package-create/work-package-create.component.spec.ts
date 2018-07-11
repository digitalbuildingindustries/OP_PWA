import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkPackageCreateComponent } from './work-package-create.component';

describe('WorkPackageCreateComponent', () => {
  let component: WorkPackageCreateComponent;
  let fixture: ComponentFixture<WorkPackageCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WorkPackageCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkPackageCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
