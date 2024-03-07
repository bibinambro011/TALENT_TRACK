import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultsloatComponent } from './defaultsloat.component';

describe('DefaultsloatComponent', () => {
  let component: DefaultsloatComponent;
  let fixture: ComponentFixture<DefaultsloatComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DefaultsloatComponent]
    });
    fixture = TestBed.createComponent(DefaultsloatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
