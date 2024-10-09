import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token'); // Reemplaza 'token' por la clave que uses en localStorage

    if (token) {
      // Si el token existe, se permite el acceso
      return true;
    } else {
      // Si no existe el token, redirige a la página de login u otra ruta
      this.router.navigate(['/login']);
      return false;
    }
  }
}
