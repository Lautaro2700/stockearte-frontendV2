import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ManageStocksComponent } from './manage-stocks.component';

describe('ManageStocksComponent', () => {
  let component: ManageStocksComponent;
  let fixture: ComponentFixture<ManageStocksComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageStocksComponent]
    });
    fixture = TestBed.createComponent(ManageStocksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
