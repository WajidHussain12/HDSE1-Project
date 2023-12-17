import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from 'src/app/apiresponse';
import * as JSZip from 'jszip';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private request: HttpClient) { }


  orderApi: string = "https://localhost:7168/api/AdminOrderAPI";
  userApi: string = "https://localhost:7168/api/AdminUserAPI";
  recipesApi: string = "https://localhost:7168/api/AdminRecipeAPI";
  booksApi: string = "https://localhost:7168/api/AdminBookAPI";
  usersRecipesApi: string = " http://localhost:3000/usersRecipes";
  recipeWinnerApi: string = " http://localhost:3000/recipeWinners";
  varietyapi: string = "https://localhost:7168/api/AdminVarietyAPI";
  // varietyapiGetWithRecipes: string = "https://localhost:7168/api/AdminVarietyAPI/GetVarietiesDataWithRecipes";
  // addVarityApi: string = "https://localhost:7168/api/AdminVarietyAPI";

  // User Methods

  getUsersData() {
    return this.request.get(this.userApi);
  }

  addUser(data: any) {
    return this.request.post(this.userApi, data);
  }

  getEditUserData(id: any) {
    return this.request.get(`${this.userApi}/${id}`)
  }

  UpdataUser(id: any, data: any) {
    return this.request.put(`${this.userApi}/${id}`, data)

  }

  // GetdeleteUsername

  GetdeleteUsername(id: number) {
    return this.request.get(`${this.userApi}/${id}`)
  }

  DeleteUser(Did: number) {
    return this.request.delete(`${this.userApi}/${Did}`);
  }



  // Order Methods

  getOrdersData() {
    return this.request.get(this.orderApi);
  }



  // Recipes Methods

  getrecipesData() {
    return this.request.get(this.recipesApi);
  }

  // downloadRecipes() {
  //   const apiUrl = 'https://localhost:7168/api/AdminRecipeAPI';
  //   return this.request.get(apiUrl, { responseType: 'arraybuffer' });
  // }

  // getAllRecipeFiles(): Observable<any> {
  //   return this.request.get(this.apiUrl + '/GetAllRecipeFiles');
  // }



  // This Method Use For Show More Button On Recipe Cards

  getRecipeInstructionData(id: any) {
    return this.request.get(`${this.recipesApi}/${id}`)
  }

  GetdeleteRecipe(id: number) {
    return this.request.get(`${this.recipesApi}/${id}`)
  }
  DeleteRecipe(Did: number) {
    return this.request.delete(`${this.recipesApi}/${Did}`);
  }


  // Angular Service
  addRecipe(formData: FormData): Observable<any> {
    return this.request.post(this.recipesApi, formData);
  }









  getEditRecipeData(id: number) {
    return this.request.get(`${this.recipesApi}/${id}`)
  }

  updateRecipe(id: any, data: any) {
    return this.request.put(`${this.recipesApi}/${id}`, data)
  }

  // User Recipes Methods
  getuserrecipesData() {
    return this.request.get(this.usersRecipesApi);
  }
  getSingleUserRecipeAllData(id: any) {
    return this.request.get(`${this.usersRecipesApi}/${id}`)
  }

  GetuserdeleteRecipe(id: number) {
    return this.request.get(`${this.usersRecipesApi}/${id}`)
  }
  DeleteuserRecipe(Did: number) {
    return this.request.delete(`${this.usersRecipesApi}/${Did}`);
  }
  //userRecipe Add To Menu Method

  get_SingleUserRecipeData_ById(id: any) {
    return this.request.get(`${this.usersRecipesApi}/${id}`)
  }

  get_AddToMenu_SingleUserRecipeData_ById(id: any) {
    return this.request.get(`${this.usersRecipesApi}/${id}`)
  }

  //addGetedDataintoMenu
  addGetedDataintoMenu(data: any) {
    return this.request.post(this.recipesApi, data)
  }


  // Flavour Methods

  // getFlavoursData() {
  //   return this.request.get(this.flavourApi)
  // }
  // DeleteFlavour(Did: number) {
  //   return this.request.delete(`${this.flavourApi}/${Did}`);
  // }

  // GetdeleteFlavourname(id: number) {
  //   return this.request.get(`${this.flavourApi}/${id}`)
  // }


  // Books Methods

  getbookssData() {
    return this.request.get(this.booksApi)
  }
  Deletebook(Did: number) {
    return this.request.delete(`${this.booksApi}/${Did}`);
  }

  Getdeletebookname(id: number) {
    return this.request.get(`${this.booksApi}/${id}`)
  }

  //AddBook Method

  addbook(data: FormData): Observable<any>{
    return this.request.post(this.booksApi, data)
  }


  //recipeWinner Methods

  getRecipeWinnerallData() {
    return this.request.get(this.recipeWinnerApi)
  }

  addrecipeWinner(data: any) {
    return this.request.post(this.recipeWinnerApi, data)
  }


  //Variety Api

  getVarietyData() {
    return this.request.get(this.varietyapi)
  }

  getVarietyDataByID(id: any) {
    return this.request.get(`${this.varietyapi}/${id}`)
  }

  updateVarietyData(id: any, data: any) {
    return this.request.put(`${this.varietyapi}/${id}`, data);
  }
  //Admin add Variety api

  addVariety(data: any) {
    return this.request.post(this.varietyapi, data)
  }

  deleteVariety(id: any) {
    return this.request.delete(`${this.varietyapi}/${id}`)
  }






}
