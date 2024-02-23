import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentAppointmentsComponent } from './agent-appointments.component';

describe('AgentAppointmentsComponent', () => {
  let component: AgentAppointmentsComponent;
  let fixture: ComponentFixture<AgentAppointmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentAppointmentsComponent]
    });
    fixture = TestBed.createComponent(AgentAppointmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
