import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.css']
})
export class AddRecipeComponent {

  constructor(private http: HttpClient, private requestService: AdminService, public formBuilder: FormBuilder, private toastr: ToastrService, private route: Router) { }
  ngOnInit(): void {

  }

  recipeForm = this.formBuilder.group({
    flavorName: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
    cookingTime: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9 ]*')]],
    ingredients: ['', [Validators.required, Validators.minLength(20)]],
    instructions: ['', [Validators.required, Validators.minLength(30)]],
    calories: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9 -]*')]],
    recipeImage:['',Validators.required],
    recipeBannerImage:['',Validators.required],
    recipeFlavourImage:['',Validators.required],
    authorId: ['1'],
    authorName: ['Admin'],
    status: ['Available'],
    rating: ['0']

  });




  postfile: any;
  postfile1: any;
  postfile2: any;

  onFileChange(event: any) {
    const file = event.target.files[0];
    const recipeFormData = this.recipeForm.value;
    this.postfile = file
  }

  onFileChange1(event: any) {
    const file = event.target.files[0];
    const recipeFormData = this.recipeForm.value;
    this.postfile1 = file
  }

  onFileChange2(event: any) {
    const file = event.target.files[0];
    const recipeFormData = this.recipeForm.value;
    this.postfile2 = file
  }

  save() {

    const recipeFormData = this.recipeForm.value as {
      flavorName: string,
      cookingTime: string,
      ingredients: string,
      instructions: string,
      calories: string,
      authorId: string,
      authorName: string,
      status: string,
      rating: string
    };


    const formData = new FormData();
    formData.append('file', this.postfile, this.postfile.name);
    formData.append('FileRecipeBanner', this.postfile1, this.postfile1.name);
    formData.append('FileVarietyBanner', this.postfile2, this.postfile2.name);
    formData.append('flavorName', recipeFormData.flavorName);
    formData.append('cookingTime', recipeFormData.cookingTime);
    formData.append('ingredients', recipeFormData.ingredients);
    formData.append('instructions', recipeFormData.instructions);
    formData.append('calories', recipeFormData.calories);
    formData.append('authorId', recipeFormData.authorId);
    formData.append('authorName', recipeFormData.authorName);
    formData.append('status', recipeFormData.status);
    formData.append('rating', recipeFormData.rating);
    // console.log("formData",formData)

    this.requestService.addRecipe(formData).subscribe(
      (data) => {
        console.log("response data", data);
        this.route.navigate(['/admin/recipes'])
        this.toastr.success("Recipe Added ")
      },
      (error) => {
        console.error("Error:", error);
      }
    );
  }

}
