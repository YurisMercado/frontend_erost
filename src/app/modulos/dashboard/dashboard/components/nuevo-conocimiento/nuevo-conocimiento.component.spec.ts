import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevoConocimientoComponent } from './nuevo-conocimiento.component';

describe('NuevoConocimientoComponent', () => {
  let component: NuevoConocimientoComponent;
  let fixture: ComponentFixture<NuevoConocimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevoConocimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevoConocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
