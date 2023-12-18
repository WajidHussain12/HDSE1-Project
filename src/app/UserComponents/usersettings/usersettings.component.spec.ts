import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersettingsComponent } from './usersettings.component';

describe('UsersettingsComponent', () => {
  let component: UsersettingsComponent;
  let fixture: ComponentFixture<UsersettingsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersettingsComponent]
    });
    fixture = TestBed.createComponent(UsersettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
