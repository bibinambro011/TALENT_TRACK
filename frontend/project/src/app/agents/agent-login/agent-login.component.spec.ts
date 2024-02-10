import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentLoginComponent } from './agent-login.component';

describe('AgentLoginComponent', () => {
  let component: AgentLoginComponent;
  let fixture: ComponentFixture<AgentLoginComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentLoginComponent]
    });
    fixture = TestBed.createComponent(AgentLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
