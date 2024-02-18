import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentDetailsComponent } from './agent-details.component';

describe('AgentDetailsComponent', () => {
  let component: AgentDetailsComponent;
  let fixture: ComponentFixture<AgentDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentDetailsComponent]
    });
    fixture = TestBed.createComponent(AgentDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
