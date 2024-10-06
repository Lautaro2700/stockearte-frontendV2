import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductModificationComponent } from './product-modification.component';

describe('ProductModificationComponent', () => {
  let component: ProductModificationComponent;
  let fixture: ComponentFixture<ProductModificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductModificationComponent]
    });
    fixture = TestBed.createComponent(ProductModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
