import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAgentComponent } from './search-agent.component';

describe('SearchAgentComponent', () => {
  let component: SearchAgentComponent;
  let fixture: ComponentFixture<SearchAgentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchAgentComponent]
    });
    fixture = TestBed.createComponent(SearchAgentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
