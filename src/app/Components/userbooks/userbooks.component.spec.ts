import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserbooksComponent } from './userbooks.component';

describe('UserbooksComponent', () => {
  let component: UserbooksComponent;
  let fixture: ComponentFixture<UserbooksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserbooksComponent]
    });
    fixture = TestBed.createComponent(UserbooksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
