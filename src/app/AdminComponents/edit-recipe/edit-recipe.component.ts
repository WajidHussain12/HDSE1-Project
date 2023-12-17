import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { NgForm } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { of } from 'rxjs';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.css']
})
export class EditRecipeComponent {

  constructor(private requestService: AdminService, public formBuilder: FormBuilder, private toastr: ToastrService, private route: Router, private ActivatedRoute: ActivatedRoute) { }


  selectedFile: any
  selectedFile1: any
  selectedFile2: any
  RecipeId: number
  recipeImageFile: any
  ResponseDatabaseImgae: any
  ResponseDatabaseImgae1: any
  ResponseDatabaseImgae2: any
  fileData: any
  DecodedFile: any
  fileDataBannerImage: any
  fileDataFlavourImage: any
  recipeBannerImageFile: any
  recipeflavourImageFile: any
  DecodedFile1: any
  DecodedFile2: any


  ngOnInit(): void {

    this.getEditRecipeData()


    // setTimeout(() => {
    //   console.log(this.DecodedFile)
    // }, 5000)
  }

  recipeForm = this.formBuilder.group({
    recipeid: [''],
    flavorName: [''],
    cookingTime: [''],
    ingredients: [''],
    instructions: [''],
    calories: [''],


    authorId: [''],
    authorName: [''],
    status: [''],
    rating: ['']
  });

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onFileSelected1(event1: any) {
    this.selectedFile1 = event1.target.files[0];
    // console.log(this.selectedFile1)
  }

  onFileSelected2(event: any) {
    this.selectedFile2 = event.target.files[0];
  }

  save() {
    // console.log(this.recipeForm.value);


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
    const formData2 = new FormData();

    // Check and append the first image data
    if (this.selectedFile) {
      formData2.append('file', this.selectedFile, this.selectedFile.name);
    } else {
      formData2.append('file', this.DecodedFile, this.DecodedFile.name);
    }

    // Check and append the second image data
    if (this.selectedFile1) {
      formData2.append('FileRecipeBanner', this.selectedFile1, this.selectedFile1.name);
    } else {
      formData2.append('FileRecipeBanner', this.DecodedFile1, this.DecodedFile1.name);
    }

    // Check and append the third image data
    if (this.selectedFile2) {
      formData2.append('FileVarietyBanner', this.selectedFile2, this.selectedFile2.name);
    } else {
      formData2.append('FileVarietyBanner', this.DecodedFile2, this.DecodedFile2.name);
    }

    formData2.append('flavorName', recipeFormData.flavorName);
    formData2.append('cookingTime', recipeFormData.cookingTime);
    formData2.append('ingredients', recipeFormData.ingredients);
    formData2.append('instructions', recipeFormData.instructions);
    formData2.append('calories', recipeFormData.calories);
    formData2.append('authorId', recipeFormData.authorId);
    formData2.append('authorName', recipeFormData.authorName);
    formData2.append('status', recipeFormData.status);
    formData2.append('rating', recipeFormData.rating);

  //  // Print formData content
  // formData2.forEach((value, key) => {
  //   console.log("FromData",key, value);
  // });

  // console.log(this.selectedFile1,this.selectedFile1.name)
  // console.log(this.selectedFile1)
  this.updateRecipe(formData2)

  }




  private updateRecipe(formData: any) {
    this.requestService.updateRecipe(this.RecipeId, formData).subscribe((data) => {
      this.toastr.warning("Recipe Edited");
      this.route.navigate(["admin/recipes"]);
      console.log(data)
    });
  }

  private uploadImage(file: File): Observable<string> {
    return of(file.name);
  }



  getEditRecipeData() {
    this.ActivatedRoute.params.subscribe((data) => {

      var d: any = data
      var RecipeId: number = d['id']
      this.RecipeId = RecipeId

      this.requestService.getEditRecipeData(RecipeId).subscribe((data: any) => {
        // console.log(data)
        this.ResponseDatabaseImgae = [data['recipeImageFileName']]
        this.ResponseDatabaseImgae1 = [data['recipeBannerImageFileName']]
        this.ResponseDatabaseImgae2 = [data['recipeFlavourImageFileName']]
        this.fileData = [data['fileData']]
        this.fileDataBannerImage = [data['fileDataBannerImage']]
        this.fileDataFlavourImage = [data['fileDataFlavourImage']]
        // console.log("Recipe Data", data)

        this.recipeForm = this.formBuilder.group({
          recipeid: [data['recipeid']],
          flavorName: [data['flavorName'], [Validators.required, Validators.minLength(5), Validators.maxLength(30), Validators.pattern('[a-zA-Z ]*')]],
          cookingTime: [data['cookingTime'], [Validators.required, Validators.minLength(6), Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9 ]*')]],
          ingredients: [data['ingredients'], [Validators.required, Validators.minLength(20)]],
          instructions: [data['instructions'], [Validators.required, Validators.minLength(30)]],
          calories: [data['calories'], [Validators.required, Validators.minLength(4), Validators.maxLength(40), Validators.pattern('[a-zA-Z0-9 -]*')]],

          authorId: [data['authorId']],
          authorName: [data['authorName']],
          status: [data['status']],
          rating: [data['rating']]


        });
        this.decodeFile();
        this.decodeFile2();
        this.decodeFile3();
      });

    })
  }


  // Decode First Image fileData

  decodeFile() {
    const decodedFileData = this.decodeBase64(this.fileData);
    const blob = new Blob([decodedFileData], { type: 'image/jpeg' });
    const file = new File([blob], this.ResponseDatabaseImgae, { type: 'image/jpeg' });
    this.DecodedFile = file
    this.readImageFile(file);
  }

  decodeBase64(encodedData: string): Uint8Array {
    const binaryString = window.atob(encodedData);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  readImageFile(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      this.recipeImageFile = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  }



  // Decode Second Image fileData

  decodeFile2() {
    const decodedFileData = this.decode2Base64(this.fileDataBannerImage);
    const blob = new Blob([decodedFileData], { type: 'image/jpeg' });
    const file = new File([blob], this.ResponseDatabaseImgae1, { type: 'image/jpeg' });
    this.DecodedFile1 = file
    this.readImageFile2(file);
  }

  decode2Base64(encodedData: string): Uint8Array {
    const binaryString = window.atob(encodedData);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  readImageFile2(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      this.recipeBannerImageFile = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  }




  // Decode Third Image fileData

  decodeFile3() {
    const decodedFileData = this.decode3Base64(this.fileDataFlavourImage);
    const blob = new Blob([decodedFileData], { type: 'image/jpeg' });
    const file = new File([blob], this.ResponseDatabaseImgae2, { type: 'image/jpeg' });
    this.DecodedFile2 = file
    this.readImageFile3(file);
  }

  decode3Base64(encodedData: string): Uint8Array {
    const binaryString = window.atob(encodedData);
    const binaryLen = binaryString.length;
    const bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; ++i) {
      bytes[i] = binaryString.charCodeAt(i);
    }
    return bytes;
  }

  readImageFile3(file: File) {
    const reader = new FileReader();

    reader.onload = (event) => {
      this.recipeflavourImageFile = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  }



}
