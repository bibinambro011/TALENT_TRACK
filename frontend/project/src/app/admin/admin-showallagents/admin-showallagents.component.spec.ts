import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShowallagentsComponent } from './admin-showallagents.component';

describe('AdminShowallagentsComponent', () => {
  let component: AdminShowallagentsComponent;
  let fixture: ComponentFixture<AdminShowallagentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminShowallagentsComponent]
    });
    fixture = TestBed.createComponent(AdminShowallagentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
