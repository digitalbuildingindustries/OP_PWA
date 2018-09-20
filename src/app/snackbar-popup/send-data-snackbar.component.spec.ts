import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDataSnackbarComponent } from './send-data-snackbar.component';

describe('SendDataSnackbarComponent', () => {
  let component: SendDataSnackbarComponent;
  let fixture: ComponentFixture<SendDataSnackbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendDataSnackbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDataSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
