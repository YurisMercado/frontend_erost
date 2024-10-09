import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComentarioMonitorComponent } from './comentario-monitor.component';

describe('ComentarioMonitorComponent', () => {
  let component: ComentarioMonitorComponent;
  let fixture: ComponentFixture<ComentarioMonitorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComentarioMonitorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ComentarioMonitorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
