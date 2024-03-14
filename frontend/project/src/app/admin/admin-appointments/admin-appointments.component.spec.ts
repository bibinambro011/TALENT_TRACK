import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppointmentsComponent } from './admin-appointments.component';

describe('AdminAppointmentsComponent', () => {
  let component: AdminAppointmentsComponent;
  let fixture: ComponentFixture<AdminAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAppointmentsComponent]
    });
    fixture = TestBed.createComponent(AdminAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
