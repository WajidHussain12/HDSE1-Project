import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectedRecipesComponent } from './selected-recipes.component';

describe('SelectedRecipesComponent', () => {
  let component: SelectedRecipesComponent;
  let fixture: ComponentFixture<SelectedRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SelectedRecipesComponent]
    });
    fixture = TestBed.createComponent(SelectedRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
