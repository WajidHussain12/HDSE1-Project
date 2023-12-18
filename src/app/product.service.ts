// product.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  private flavordata = 'https://localhost:7168/api/UserRecipeAPI';

  private varietydata = 'https://localhost:7168/api/UserVarietyAPI';

  userLoginApi: string = "https://localhost:7168/api/UserLoginAPI"

  public getuserDataApi: string = "https://localhost:7168/api/UserGetApi"

  addUserRecipeAPI: string = "https://localhost:7168/api/UserAddRecipeAPI"

  UserOrderApi: string = "https://localhost:7168/api/UserOrderAPI"


  changeCart: any = 0

  cartItems = 0;


  getFlavorData(): Observable<any[]> {
    return this.http.get<any[]>(this.flavordata);
  }

  getRecipeData(id: any): Observable<any[]> {
    return this.http.get<any[]>(`${this.flavordata}/${id}`);
  }


  getIndividualVarietyData(id: any) {
    return this.http.get(`${this.varietydata}/${id}`)
  }


  private books = 'https://localhost:7168/api/UserBookAPI';

  getbooks(): Observable<any[]> {
    return this.http.get<any[]>(this.books);
  }


  private apiUrl = 'http://localhost:3000';


  register(user: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/users`, user);
  }


  Userlogin(data: any): Observable<any> {
    return this.http.post(this.userLoginApi, data);
  }



  getAllFlavourData() {
    return this.http.get(this.flavordata)
  }


  addToCart() {
    this.changeCart += 1;
  }



  private cartData: any[] = [];

  getCartData(): any[] {
    return this.cartData;
  }

  setCartData(cartData: any[]): void {
    this.cartData = cartData;
  }


  getuserData(id: any) {
    return this.http.get(`${this.getuserDataApi}/${id}`)
  }


  add_User_Recipe(recipe: any) {
    return this.http.post(this.addUserRecipeAPI, recipe)
  }

  // order Method


  createOrder(Order: any) {
    return this.http.post(this.UserOrderApi,Order)
  }

}

