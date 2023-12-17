import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVarietiesComponent } from './add-varieties.component';

describe('AddVarietiesComponent', () => {
  let component: AddVarietiesComponent;
  let fixture: ComponentFixture<AddVarietiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddVarietiesComponent]
    });
    fixture = TestBed.createComponent(AddVarietiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
