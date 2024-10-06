import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreCreationComponent } from './store-creation.component';

describe('StoreCreationComponent', () => {
  let component: StoreCreationComponent;
  let fixture: ComponentFixture<StoreCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoreCreationComponent]
    });
    fixture = TestBed.createComponent(StoreCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
