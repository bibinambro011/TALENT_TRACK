import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentProfileComponent } from './agent-profile.component';

describe('AgentProfileComponent', () => {
  let component: AgentProfileComponent;
  let fixture: ComponentFixture<AgentProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentProfileComponent]
    });
    fixture = TestBed.createComponent(AgentProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
