import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MakeAlquilerComponent } from './make-alquiler.component';

describe('MakeAlquilerComponent', () => {
  let component: MakeAlquilerComponent;
  let fixture: ComponentFixture<MakeAlquilerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MakeAlquilerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MakeAlquilerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
