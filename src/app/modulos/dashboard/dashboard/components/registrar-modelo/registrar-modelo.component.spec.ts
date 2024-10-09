import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarModeloComponent } from './registrar-modelo.component';

describe('RegistrarModeloComponent', () => {
  let component: RegistrarModeloComponent;
  let fixture: ComponentFixture<RegistrarModeloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarModeloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrarModeloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
