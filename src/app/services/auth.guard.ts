import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // Vérifier si l'utilisateur est connecté
    if (this.authService.isLoggedIn()) {
      return true;
    }

    // Sinon rediriger vers la page de connexion
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
