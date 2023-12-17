import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';


export const userRouteCheckGuard: CanActivateFn = (route, state) => {

  const Admintoken = localStorage.getItem("usertoken")
  const Route = inject(Router)

  if (Admintoken) {
    Route.navigate(['/user/dashboard'])
    return false
  }
  return true;
};
