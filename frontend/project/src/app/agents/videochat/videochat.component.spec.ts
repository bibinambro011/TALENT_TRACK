import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideochatComponent } from './videochat.component';

describe('VideochatComponent', () => {
  let component: VideochatComponent;
  let fixture: ComponentFixture<VideochatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VideochatComponent]
    });
    fixture = TestBed.createComponent(VideochatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
