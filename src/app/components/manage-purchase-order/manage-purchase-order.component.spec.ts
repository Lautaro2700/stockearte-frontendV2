import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagePurchaseOrdersComponent } from './manage-purchase-order.component';

describe('ManagePurchaseOrdersComponent', () => {
  let component: ManagePurchaseOrdersComponent;
  let fixture: ComponentFixture<ManagePurchaseOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManagePurchaseOrdersComponent]
    });
    fixture = TestBed.createComponent(ManagePurchaseOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
