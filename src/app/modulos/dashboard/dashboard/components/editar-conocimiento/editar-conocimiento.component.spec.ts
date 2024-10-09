import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarConocimientoComponent } from './editar-conocimiento.component';

describe('EditarConocimientoComponent', () => {
  let component: EditarConocimientoComponent;
  let fixture: ComponentFixture<EditarConocimientoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarConocimientoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarConocimientoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
