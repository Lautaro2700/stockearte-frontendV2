import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  private isAuthenticated: boolean = false;

  constructor(private router: Router) {}

  login(storeId: number): void {
    localStorage.setItem('user', 'authenticated');
    localStorage.setItem('storeId', storeId.toString());
    this.isAuthenticated = true;
    this.router.navigate(['/images']);
  }

  logout(): void {
    localStorage.removeItem('user');
    localStorage.removeItem('storeId');
    this.isAuthenticated = false;
    this.router.navigate(['/login']);
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.isAuthenticated || !!localStorage.getItem('user')) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
