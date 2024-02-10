import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtpenterComponent } from './otpenter.component';

describe('OtpenterComponent', () => {
  let component: OtpenterComponent;
  let fixture: ComponentFixture<OtpenterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OtpenterComponent]
    });
    fixture = TestBed.createComponent(OtpenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
