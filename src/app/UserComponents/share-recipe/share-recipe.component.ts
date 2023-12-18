import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-share-recipe',
  templateUrl: './share-recipe.component.html',
  styleUrls: ['./share-recipe.component.css']
})
export class ShareRecipeComponent implements OnInit {

  constructor(private http: HttpClient, private Service: ProductService, public formBuilder: FormBuilder, private toastr: ToastrService, private route: Router, private ActivatedRoute: ActivatedRoute) {
    this.getUserDetails()
  }

  ngOnInit(): void {
  }


  getUserDetails() {
    this.ActivatedRoute.params.subscribe((data: any) => {
      const userid = data['id']

      this.Service.getuserData(userid).subscribe((data: any) => {
        this.UserName = data['userName']
        this.Userid = data['userid']
        console.log("Recipe UserDetails", data)
      });

    });
  }


  UserName: any = '';
  Userid: any = '';

  recipeForm = this.formBuilder.group({
    recipe_Name: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],

    cooking_Time: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9 ]*')]],

    ingredients: ['', [Validators.required, Validators.minLength(20)]],
    instructions: ['', [Validators.required, Validators.minLength(30)]],

    calories: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9 -]*')]],

    author_ID: [''],
    author_Name: [''],
  });







  save() {
    this.recipeForm.get('author_ID')?.setValue(this.Userid)
    this.recipeForm.get('author_Name')?.setValue(this.UserName)
    const recipeFormValues = this.recipeForm.value

    this.Service.add_User_Recipe(recipeFormValues).subscribe((data: any) => {
      this.toastr.success("Recipe Added")
      this.recipeForm.reset()
      console.log(data)
    })

    // console.log(recipeFormValues)

  }


}
