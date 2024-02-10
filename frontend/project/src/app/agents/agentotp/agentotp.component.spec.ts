import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentotpComponent } from './agentotp.component';

describe('AgentotpComponent', () => {
  let component: AgentotpComponent;
  let fixture: ComponentFixture<AgentotpComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentotpComponent]
    });
    fixture = TestBed.createComponent(AgentotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
