import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminLoginService {

  constructor(private request: HttpClient) { }

  ResponseAdminid: any

  private adminlogiStatusSource = new BehaviorSubject<boolean>(false);
  adminlogiStatus$ = this.adminlogiStatusSource.asObservable();

  adminloginAPI: string = "https://localhost:7168/api/AdminLoginAPI"
  // adminlogiStatus:any

  adminLogin(data: any) {
    return this.request.post(this.adminloginAPI, data)
  }


  setAdminlogiStatus(status: boolean) {
    this.adminlogiStatusSource.next(status);
  }


  private readonly TOKEN_KEY = 'token';

  isAuthenticated(): boolean {
    const token = this.getToken();

    if (token) {
      return this.validateToken(token);
    }

    return false;
  }

  private getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  private validateToken(token: string): boolean {
    try {
      const decodedToken: any = jwt_decode(token);

      // You may customize the validation logic based on your token structure
      return decodedToken && decodedToken.exp && decodedToken.exp > Date.now() / 1000;
    } catch (error) {
      console.error('Error decoding or validating token:', error);
      return false;
    }
  }

  // adminlogin(status: boolean) {
  //   if (status) {
  //     return true
  //   }
  //   else
  //     return false
  // }
}
function jwt_decode(token: string): any {
  throw new Error('Function not implemented.');
}

