import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageModificationComponent } from './image-modification.component';

describe('ImageModificationComponent', () => {
  let component: ImageModificationComponent;
  let fixture: ComponentFixture<ImageModificationComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ImageModificationComponent]
    });
    fixture = TestBed.createComponent(ImageModificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
