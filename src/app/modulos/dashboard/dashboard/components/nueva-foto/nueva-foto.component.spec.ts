import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaFotoComponent } from './nueva-foto.component';

describe('NuevaFotoComponent', () => {
  let component: NuevaFotoComponent;
  let fixture: ComponentFixture<NuevaFotoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NuevaFotoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaFotoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
