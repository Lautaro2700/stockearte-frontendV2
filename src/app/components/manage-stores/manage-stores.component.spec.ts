import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageStoresComponent } from './manage-stores.component';

describe('ManageStoresComponent', () => {
  let component: ManageStoresComponent;
  let fixture: ComponentFixture<ManageStoresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStoresComponent]
    });
    fixture = TestBed.createComponent(ManageStoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
