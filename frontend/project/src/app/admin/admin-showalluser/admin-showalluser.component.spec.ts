import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowalluserComponent } from './admin-showalluser.component';

describe('AdminShowalluserComponent', () => {
  let component: AdminShowalluserComponent;
  let fixture: ComponentFixture<AdminShowalluserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminShowalluserComponent]
    });
    fixture = TestBed.createComponent(AdminShowalluserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
