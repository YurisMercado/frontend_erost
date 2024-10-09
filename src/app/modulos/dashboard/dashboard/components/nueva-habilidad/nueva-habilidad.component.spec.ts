import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaHabilidadComponent } from './nueva-habilidad.component';

describe('NuevaHabilidadComponent', () => {
  let component: NuevaHabilidadComponent;
  let fixture: ComponentFixture<NuevaHabilidadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaHabilidadComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaHabilidadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
