import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

export const userauthGuard: CanActivateFn = (route, state) => {




  const router = inject(Router);
  const token = localStorage.getItem('usertoken');
  const jwtHelper = new JwtHelperService();

  if (token) {
    if (!jwtHelper.isTokenExpired(token)) {
      return true;
    }
  }

  if (jwtHelper.isTokenExpired(token)) {
    localStorage.removeItem('usertoken');
    localStorage.removeItem('cart');
    localStorage.removeItem('checkout');
    router.navigate(['login']);
    return false;
  }

  return false;


};
