import { Component, inject } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-topbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent {
  public layoutService: LayoutService = inject(LayoutService)

  constructor(private router: Router) {}
  

  cerrarSesion() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

}
