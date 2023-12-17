import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditVarietiesComponent } from './edit-varieties.component';

describe('EditVarietiesComponent', () => {
  let component: EditVarietiesComponent;
  let fixture: ComponentFixture<EditVarietiesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditVarietiesComponent]
    });
    fixture = TestBed.createComponent(EditVarietiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
