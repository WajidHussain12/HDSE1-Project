import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AdminService } from 'src/app/Services/Admin/admin.service';
import { ApiResponse } from 'src/app/apiresponse';
import * as JSZip from 'jszip';



@Component({
  selector: 'app-recipes',
  templateUrl: './recipes.component.html',
  styleUrls: ['./recipes.component.css']
})
export class RecipesComponent {

  recipes:any
  constructor(private requestService: AdminService, private toastr: ToastrService) { }
  ngOnInit(): void {
    // this.requesrRepipesData();


    this.requestService.getrecipesData().subscribe((data: any) => {
        this.recipes = data;

        // Decode base64 file data
        this.recipes.forEach((recipe:any) => {
          if (recipe.File && recipe.File.FileData) {
            const byteCharacters = atob(recipe.File.FileData);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/octet-stream' });

            // Create a URL for the blob
            recipe.File.FileData = URL.createObjectURL(blob);
            console.log(data)
          }
        });
      },
      error => {
        console.error('Error fetching recipes:', error);
      }
    );
  }


  // getBase64ImageSource(base64Image: string): string {
  //   return 'data:image/jpeg;base64,' + base64Image;
  // }



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
    this.requestService.getRecipeInstructionData(id).subscribe((data) => {
      var i: any = data;

      const encodedFileData = i['fileData'];

      // Decode the Base64-encoded file data
      const decodedFileData = this.decodeBase64(encodedFileData);
      const dataUrl = this.arrayBufferToBase64(decodedFileData);


      this.image = dataUrl,
        this.Recipe_Name = i['flavorName'],
        this.Ingredients = i['ingredients'],
        this.Instructions = i['instructions'],
        this.Cooking_Time = i['cookingTime'],
        this.RecipeID = i['recipeid']
      this.UserID = i['authorId']
      this.UserName = i['authorName']
      this.Calories = i['calories']
      this.Rating = i['rating']
      this.Status = i['status']

      console.log(data)

    });
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

  arrayBufferToBase64(buffer: Uint8Array): string {
    let binary = '';
    buffer.forEach((byte) => (binary += String.fromCharCode(byte)));
    return 'data:image/jpeg;base64,' + window.btoa(binary);
  }

  inst: any



  RecipesData: any;
  r: any;
  imageSrc: string;
  manifestItems: any[] = [];
  fr: any



  // recipes: any[] = [];
  // processZip(data: ArrayBuffer) {
  //   const zip = new JSZip();
  //   zip.loadAsync(data).then((archive) => {
  //     const recipes: any[] = [];

  //     archive.forEach(async (relativePath, zipEntry) => {
  //       const imageUrl = `data:image/png;base64,${await zipEntry.async('base64')}`;
  //       const propertyMatches = zipEntry.name.match(/(\d+)_(.+)_(.+)_(.+)_(.+)_(.+)_(.+)_(.+)_(.+)_(.+)_(.+)/);

  //       // const someValue = someObject.someProperty?.[2];
  //       const recipe: any = {
  //         // recipeid: /* Extract recipeid from zipEntry.name */,
  //         flavorName: zipEntry.name,
  //         // instructions: /* Extract instructions from zipEntry.name */,
  //         // ingredients: /* Extract ingredients from zipEntry.name */,
  //         // cookingTime: /* Extract cookingTime from zipEntry.name */,
  //         // calories: /* Extract calories from zipEntry.name */,
  //         // rating: /* Extract rating from zipEntry.name */,
  //         // status: /* Extract status from zipEntry.name */,
  //         // authorId: /* Extract authorId from zipEntry.name */,
  //         // authorName: /* Extract authorName from zipEntry.name */,
  //         recipeImageFileName: zipEntry.name,
  //         imageUrl: imageUrl,
  //       };
  //       console.log("archive",archive)

  //       recipes.push(recipe);
  //     });

  //     this.recipes = recipes;
  //   });
  // }

  // imageUrls: string[] = [];

  // handleDownloadedData(data: ArrayBuffer) {
  //   const jszip = new JSZip();
  //   jszip.loadAsync(data).then((zip) => {
  //     zip.forEach((relativePath, zipEntry) => {
  //       zipEntry.async('base64').then((fileData) => {
  //         const imageUrl = `data:image/png;base64,${fileData}`;
  //         this.imageUrls.push(imageUrl);
  //         console.log(this.imageUrls)
  //       });
  //     });
  //   });
  // }
  // this.http.get<ApiResponse>('your-api-endpoint').subscribe(result => {
  //   this.imageSrc = 'data:image/jpeg;base64,' + result.Image;
  // });



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
    this.requestService.GetdeleteRecipe(Deleteid).subscribe((data) => {
      var d: any = data;
      this.RecipeName = d['flavorName']
      this.AuthorName = d['authorName']
    });
  }


  DeleteRecipe(id: number) {
    this.requestService.DeleteRecipe(id).subscribe((data) => {
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

}
