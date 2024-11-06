import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioAdministradorComponent } from './comentario-administrador.component';

describe('ComentarioAdministradorComponent', () => {
  let component: ComentarioAdministradorComponent;
  let fixture: ComponentFixture<ComentarioAdministradorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioAdministradorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComentarioAdministradorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
