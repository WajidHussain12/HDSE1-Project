import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DemoDashboardComponent } from './demo-dashboard.component';

describe('DemoDashboardComponent', () => {
  let component: DemoDashboardComponent;
  let fixture: ComponentFixture<DemoDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DemoDashboardComponent]
    });
    fixture = TestBed.createComponent(DemoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
