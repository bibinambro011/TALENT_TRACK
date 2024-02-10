import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgentSearchComponent } from './agent-search.component';

describe('AgentSearchComponent', () => {
  let component: AgentSearchComponent;
  let fixture: ComponentFixture<AgentSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AgentSearchComponent]
    });
    fixture = TestBed.createComponent(AgentSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
