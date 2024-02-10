import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentRegisterComponent } from './agent-register.component';

describe('AgentRegisterComponent', () => {
  let component: AgentRegisterComponent;
  let fixture: ComponentFixture<AgentRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentRegisterComponent]
    });
    fixture = TestBed.createComponent(AgentRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
