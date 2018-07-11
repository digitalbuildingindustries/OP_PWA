import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateSnackbarComponent } from './update-snackbar.component';

describe('UpdateSnackbarComponent', () => {
  let component: UpdateSnackbarComponent;
  let fixture: ComponentFixture<UpdateSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
