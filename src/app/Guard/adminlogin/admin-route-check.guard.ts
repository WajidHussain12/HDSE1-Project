import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminRouteCheckGuard: CanActivateFn = (route, state) => {

  const Admintoken = localStorage.getItem("admintoken")
  const Route = inject(Router)
  if (Admintoken) {
    Route.navigate(['/user/dashboard'])
    return false
  }
  return true;
};
