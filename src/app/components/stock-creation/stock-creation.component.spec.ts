import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockCreationComponent } from './stock-creation.component';

describe('StoreCreationComponent', () => {
  let component: StockCreationComponent;
  let fixture: ComponentFixture<StockCreationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockCreationComponent]
    });
    fixture = TestBed.createComponent(StockCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
