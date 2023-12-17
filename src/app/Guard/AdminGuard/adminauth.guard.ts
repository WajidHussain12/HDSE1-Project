import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';




export const adminauthGuard: CanActivateFn = (route, state) => {

  const router = inject(Router);
  const token = localStorage.getItem('admintoken');
  const jwtHelper = new JwtHelperService();

  if (token) {
    if (!jwtHelper.isTokenExpired(token)) {
      return true;
    }
  }

  if (jwtHelper.isTokenExpired(token)) {
    localStorage.removeItem('admintoken');
  }


  router.navigate(['adminlogin']);
  return false;
};


// export const adminauthGuard: CanActivateFn = (route, state) => {

//   const router = inject(Router);

//   const token = localStorage.getItem('admintoken');
//   const jwtHelper = new JwtHelperService();

//   if (token) {
//     if (!jwtHelper.isTokenExpired(token)) {
//       return true;
//     }
//   }
//   router.navigate(['adminlogin'])
//   return false

// }





