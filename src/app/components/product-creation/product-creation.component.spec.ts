import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductCreationComponent } from './product-creation.component';

describe('StoreCreationComponent', () => {
  let component: ProductCreationComponent;
  let fixture: ComponentFixture<ProductCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductCreationComponent]
    });
    fixture = TestBed.createComponent(ProductCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
