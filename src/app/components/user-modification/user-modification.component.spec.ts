import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserModificationComponent } from './user-modification.component';

describe('UserModificationComponent', () => {
  let component: UserModificationComponent;
  let fixture: ComponentFixture<UserModificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UserModificationComponent]
    });
    fixture = TestBed.createComponent(UserModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
