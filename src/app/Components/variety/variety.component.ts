import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-variety',
  templateUrl: './variety.component.html',
  styleUrls: ['./variety.component.css']
})
export class VarietyComponent implements OnInit {

  constructor(public service: ProductService, private activatedRoute: ActivatedRoute) { }

  recipeId: any
  flavorVarieties: any = [];
  varietyAllData: any
  varietybannerImage: any

  ngOnInit(): void {
    this.getindivudialReipeId()
  }

  varietyimgData: any

  getindivudialReipeId() {
    this.activatedRoute.params.subscribe((data: any) => {
      this.recipeId = data['id']
      this.GetrecipeFlavourImageFileByid(this.recipeId);
      this.service.getIndividualVarietyData(this.recipeId).subscribe((data: any) => {
        this.varietyAllData = data

        // Decode base64 file data
        this.varietyAllData.forEach((recipe: any) => {
          if (recipe.File && recipe.File.FileData) {
            this.varietyimgData = recipe.File.FileData

            const byteCharacters = atob(recipe.File.FileData);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: 'application/octet-stream' });

            // Create a URL for the blob
            recipe.File.FileData = URL.createObjectURL(blob);
            recipe.IData = this.varietyimgData
          }
        });
        console.log("Recipe Data", data)
      })
    })
  }





  isUserLoggedIn = sessionStorage.getItem('isLoggedIn');

  addToCart(Variety: any) {
    const existingCartItemsString = localStorage.getItem('cart');
    const existingCartItems = existingCartItemsString ? JSON.parse(existingCartItemsString) : [];
    existingCartItems.push(Variety)

    localStorage.setItem('cart', JSON.stringify(existingCartItems))

    console.log(Variety)
  }

  openLoginModal() {
    // Implement your modal opening logic here
    console.log('Show login modal');
  }

  fileDataFlavourImage: any
  GetrecipeFlavourImageFileByid(id: any) {
    this.service.getRecipeData(id).subscribe((data: any) => {
      this.fileDataFlavourImage = data['fileDataFlavourImage']
      this.decodeFile();
      // console.log(this.fileDataFlavourImage)
    })
  }


  decodeFile() {
    const decodedFileData = this.decodeBase64(this.fileDataFlavourImage);
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
      this.varietybannerImage = event.target?.result as string;
    };

    reader.readAsDataURL(file);
  }


}
