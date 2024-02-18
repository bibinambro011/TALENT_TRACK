import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentProfilePageComponent } from './agent-profile-page.component';

describe('AgentProfilePageComponent', () => {
  let component: AgentProfilePageComponent;
  let fixture: ComponentFixture<AgentProfilePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentProfilePageComponent]
    });
    fixture = TestBed.createComponent(AgentProfilePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
