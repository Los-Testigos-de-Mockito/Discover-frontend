import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistorialAlquilerComponent } from './historial-alquiler.component';

describe('HistorialAlquilerComponent', () => {
  let component: HistorialAlquilerComponent;
  let fixture: ComponentFixture<HistorialAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HistorialAlquilerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistorialAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
