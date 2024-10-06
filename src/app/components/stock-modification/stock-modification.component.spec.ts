import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StockModificationComponent } from './stock-modification.component';

describe('StockModificationComponent', () => {
  let component: StockModificationComponent;
  let fixture: ComponentFixture<StockModificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StockModificationComponent]
    });
    fixture = TestBed.createComponent(StockModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
