import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisualizeItemComponent } from './visualize-item.component';

describe('VisualizeItemComponent', () => {
  let component: VisualizeItemComponent;
  let fixture: ComponentFixture<VisualizeItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisualizeItemComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisualizeItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
