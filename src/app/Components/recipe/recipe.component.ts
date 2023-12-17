import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';


@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent {

  constructor(private service: ProductService, private activatedRoute: ActivatedRoute) { }


  recipeId: any




  recipeGetedData: any[] = [];

  bannerImage: any

  recipeImageFile: any

  ngOnInit(): void {
    this.getindivudialReipeId()


  }



  getindivudialReipeId() {
    this.activatedRoute.params.subscribe((params: any) => {
      this.recipeId = params['id'];

      this.service.getRecipeData(this.recipeId).subscribe((data: any[]) => {
        this.recipeGetedData = [data];
        this.bannerImage = this.recipeGetedData[0]['fileDataBannerImage']

        this.decodeFile();
      })

    })
  }




  decodeFile() {
    const decodedFileData = this.decodeBase64(this.bannerImage);
    const blob = new Blob([decodedFileData], { type: 'image/jpeg' });
    const file = new File([blob], 'recipe_image.jpg', { type: 'image/jpeg' });
    // this.DecodedFile = file
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


  showModal = false;

  ShowModal(){

    this.showModal = true;

  }

  CloseModal(){

    this.showModal = false;

  }



}
