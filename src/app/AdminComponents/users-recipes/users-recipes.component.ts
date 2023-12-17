import { FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-users-recipes',
  templateUrl: './users-recipes.component.html',
  styleUrls: ['./users-recipes.component.css']
})
export class UsersRecipesComponent implements OnInit {

  constructor(private requestService: AdminService, private toastr: ToastrService, private FormBuilder: FormBuilder) { }
  ngOnInit(): void {
    this.requesrRepipesData();


  }


  image: any;
  Recipe_Name: any;
  Ingredients: any;
  Instructions: any;
  Cooking_Time: any;

  RecipeID: any;
  UserID: any;
  UserName: any;

  Calories: any;
  Rating: any;
  Status: any;




  showMore(id: any) {
    // console.log(id);
    this.requestService.getSingleUserRecipeAllData(id).subscribe((data) => {
      var i: any = data;

      this.image = i['image'],
        this.Recipe_Name = i['Recipe_Name'],
        this.Ingredients = i['Ingredients'],
        this.Instructions = i['Instructions'],
        this.Cooking_Time = i['Cooking_Time'],
        this.RecipeID = i['id']
      this.UserID = i['Author_ID']
      this.UserName = i['Author_Name']
      this.Calories = i['Calories']
      this.Rating = i['Rating']
      this.Status = i['Status']

    });
  }


  inst: any



  RecipesData: any;
  r: any;

  requesrRepipesData() {
    this.requestService.getuserrecipesData().subscribe((data) => {
      this.RecipesData = data;
    });

  }



  // Delete
  RecipeId: number = 0;
  RecipeName: string = "";
  AuthorName: string = "";

  getDeleteId(id: number) {
    this.RecipeId = id;
    console.log(this.RecipeId)
    this.getDeleteUserName(this.RecipeId)
  }

  getDeleteUserName(Deleteid: number) {
    this.requestService.GetuserdeleteRecipe(Deleteid).subscribe((data) => {
      var d: any = data;
      this.RecipeName = d['Recipe_Name']
      this.AuthorName = d['Author_Name']
    });
  }


  DeleteRecipe(id: number) {
    this.requestService.DeleteuserRecipe(id).subscribe((data) => {
      console.log("Recipe Deleted", data)
      this.ngOnInit()
    });
  }

  ConfirmDelete() {
    this.DeleteRecipe(this.RecipeId);
    this.showerror();
  }

  showerror() {
    this.toastr.error('Recipe Deleted!');
  }



  //User Recipe Edit Methods

  userRecipeId: any
  userRecipeName: any
  userRecipeAuthorId: any
  userRecipeAuthorName: any

  getUserRecipeId(id: any) {
    this.requestService.get_SingleUserRecipeData_ById(id).subscribe((data: any) => {
      this.userRecipeId = data['id']
      this.userRecipeName = data['Recipe_Name']
      this.userRecipeAuthorId = data['Author_ID']
      this.userRecipeAuthorName = data['Author_Name']
    })
  }


  ConfirmAddToMenu() {
    this.requestService.get_AddToMenu_SingleUserRecipeData_ById(this.userRecipeId).subscribe((data: any) => {
      var addToMenuForm = this.FormBuilder.group({
        Author_ID: [data['Author_ID']],
        Recipe_Name: [data['Recipe_Name']],
        Author_Name: [data['Author_Name']],
        Ingredients: [data['Ingredients']],
        Instructions: [data['Instructions']],
        Cooking_Time: [data['Cooking_Time']],
        Calories: [data['Calories']],
        Rating: [data['0']],
        Status: [data['Status']],
        image: [data['image']],
      })

      this.requestService.addGetedDataintoMenu(addToMenuForm.value).subscribe((data) => {
        this.toastr.success('User Recipe Added To Menu!');
      })
    })
  }


  ConfirmAddToWinner(){
    this.requestService.get_AddToMenu_SingleUserRecipeData_ById(this.userRecipeId).subscribe((data: any) => {
      var addToMenuForm = this.FormBuilder.group({

        Author_ID: [data['Author_ID']],
        Recipe_Name: [data['Recipe_Name']],
        Author_Name: [data['Author_Name']],
        Ingredients: [data['Ingredients']],
        Instructions: [data['Instructions']],
        Cooking_Time: [data['Cooking_Time']],
        Calories: [data['Calories']],
        Rating: [data['0']],
        Status: [data['Status']],
        image: [data['image']],
      })

      this.requestService.addrecipeWinner(addToMenuForm.value).subscribe((data) => {
        this.toastr.warning('Recipe Added To Winner List!');
      })
    })

  }
}
