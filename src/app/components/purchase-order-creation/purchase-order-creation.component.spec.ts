import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderCreationComponent } from './purchase-order-creation.component';

describe('PurchaseOrderCreationComponent', () => {
  let component: PurchaseOrderCreationComponent;
  let fixture: ComponentFixture<PurchaseOrderCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseOrderCreationComponent]
    });
    fixture = TestBed.createComponent(PurchaseOrderCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
