import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualizarfotoComponent } from './actualizarfoto.component';

describe('ActualizarfotoComponent', () => {
  let component: ActualizarfotoComponent;
  let fixture: ComponentFixture<ActualizarfotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualizarfotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActualizarfotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
