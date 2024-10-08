import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseOrderModificationComponent } from './purchase-order-modification.component';

describe('UserModificationComponent', () => {
  let component: PurchaseOrderModificationComponent;
  let fixture: ComponentFixture<PurchaseOrderModificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchaseOrderModificationComponent]
    });
    fixture = TestBed.createComponent(PurchaseOrderModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
