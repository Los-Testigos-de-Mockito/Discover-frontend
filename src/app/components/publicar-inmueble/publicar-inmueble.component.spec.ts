import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicarInmuebleComponent } from './publicar-inmueble.component';

describe('PublicarInmuebleComponent', () => {
  let component: PublicarInmuebleComponent;
  let fixture: ComponentFixture<PublicarInmuebleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicarInmuebleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicarInmuebleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
