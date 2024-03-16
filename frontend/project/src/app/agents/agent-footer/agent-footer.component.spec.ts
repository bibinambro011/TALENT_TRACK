import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentFooterComponent } from './agent-footer.component';

describe('AgentFooterComponent', () => {
  let component: AgentFooterComponent;
  let fixture: ComponentFixture<AgentFooterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentFooterComponent]
    });
    fixture = TestBed.createComponent(AgentFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
